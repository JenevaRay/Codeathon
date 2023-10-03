'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const dotenv_1 = __importDefault(require('dotenv'));
dotenv_1.default.config();
const cors_1 = __importDefault(require('cors'));
const express_1 = __importDefault(require('express'));
const apollo_server_express_1 = require('apollo-server-express');
const path_1 = __importDefault(require('path'));
// import { AuthMiddleware } from './utils/auth'
const body_parser_1 = __importDefault(require('body-parser'));
const index_1 = require('./schemas/index');
const connection_1 = require('./config/connection');
const stripe_1 = __importDefault(require('stripe'));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Stripe payment info inspired by https://github.com/stripe-samples/accept-a-payment
if (process.env.NODE_ENV !== 'production') {
  app.use((0, cors_1.default)());
}
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Must have STRIPE SECRET KEY');
}
const stripe = new stripe_1.default(
  process.env.STRIPE_SECRET_KEY || 'MUST USE SECRET',
  {
    apiVersion: '2023-08-16',
    appInfo: {
      name: 'codeathon-demo-app/accept-a-payment',
      url: 'https://codeathon-1b48b4588e47.herokuapp.com',
      version: '0.0.1',
    },
    typescript: true,
  },
);
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next();
  } else {
    body_parser_1.default.json()(req, res, next);
  }
});
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(
  '/images',
  express_1.default.static(path_1.default.join(__dirname, '../client/images')),
);
app.get('/config', (_, res) => {
  console.log('PK fetched!');
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});
app.post('/create-payment-intent', (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { currency, paymentMethodType, paymentMethodOptions } = req.body;
    const params = {
      amount: 1999,
      currency,
      payment_method_types:
        paymentMethodType === 'link' ? ['link', 'card'] : [paymentMethodType],
    };
    if (paymentMethodType === 'accs_debit') {
      params.payment_method_options = {
        acss_debit: {
          mandate_options: {
            payment_schedule: 'sporadic',
            transaction_type: 'personal',
          },
        },
      };
    } else if (paymentMethodType === 'customer_balance') {
      params.payment_method_data = {
        type: 'customer_balance',
      };
      params.confirm = true;
      params.customer =
        req.body.customerId ||
        (yield stripe.customers.create().then((data) => data.id));
    }
    if (paymentMethodOptions) {
      params.payment_method_options = paymentMethodOptions;
    }
    try {
      const paymentIntent = yield stripe.paymentIntents.create(params);
      res.send({
        clientSecret: paymentIntent.client_secret,
        nextAction: paymentIntent.next_action,
      });
    } catch (e) {
      res.status(400).send({
        error: {
          message: e.message,
        },
      });
    }
  }),
);
app.get('/payment/next', (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const paymentIntent = req.query.payment_intent;
    const intent = yield stripe.paymentIntents.retrieve(paymentIntent, {
      expand: ['payment_method'],
    });
    res.redirect(
      `/success?payment_intent_client_secret=${intent.client_secret}`,
    );
  }),
);
// app.get('/success', async (req, res) => {
//   // send file for payment success
// })
app.post(
  '/webhook',
  body_parser_1.default.raw({ type: 'application/json' }),
  (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      let event;
      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          req.headers['stripe-signature'] || '',
          process.env.STRIPE_WEBHOOK_SECRET || '',
        );
      } catch (err) {
        console.log(`Webhook signature verification failed!`);
        res.sendStatus(400);
        return;
      }
      const data = event.data;
      const eventType = event.type;
      if (eventType === 'payment_intent.succeeded') {
        const pi = data.object;
        // funds have been captured.  fulfill any orders, e-mail receipts, etc.
        // to cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
        console.log(`Webhook received: ${pi.object} ${pi.status}!`);
        console.log(`Payment captured`);
      } else if (eventType === 'payment_intent.payment_failed') {
        const pi = data.object;
        console.log(`Webhook received: ${pi.object} ${pi.status}!`);
        console.log('Payment failed');
      }
    }),
);
const server = new apollo_server_express_1.ApolloServer({
  typeDefs: index_1.typeDefs,
  resolvers: index_1.resolvers,
  // context: authMiddleware
});
if (process.env.NODE_ENV === 'production') {
  app.use(
    express_1.default.static(path_1.default.join(__dirname, '../client/build')),
  );
}
// app.get('/', (_, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });
const startApolloServer = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield server.start();
    server.applyMiddleware({ app });
    connection_1.db.once('open', () => {
      app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at ${server.graphqlPath}`);
      });
    });
  });
startApolloServer();
//# sourceMappingURL=server.js.map
