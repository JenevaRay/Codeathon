import dotenv from 'dotenv';
dotenv.config();

// import cors from 'cors';
import Express from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
// import { AuthMiddleware } from './utils/auth'
import bodyParser from 'body-parser';
import { typeDefs, resolvers } from './schemas/index';
import { db } from './config/connection';

import { unresolvers } from './schemas/resolvers';

import Stripe from 'stripe';

const app = Express();
const PORT = process.env.PORT || 3001;

// Stripe payment info inspired by https://github.com/stripe-samples/accept-a-payment

if (process.env.NODE_ENV === 'production') {
  // app.use(cors());
  app.use(Express.static(path.join(__dirname, '../client/build')))
}

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Must have STRIPE SECRET KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'MUST USE SECRET', {
  apiVersion: '2023-08-16',
  appInfo: {
    name: 'codeathon-demo-app/accept-a-payment',
    url: 'https://codeathon-1b48b4588e47.herokuapp.com',
    version: '0.0.1',
  },
  typescript: true,
});

app.use(
  (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction,
  ): void => {
    if (req.originalUrl === '/webhook') {
      next();
    } else {
      bodyParser.json()(req, res, next);
    }
  },
);

app.use(Express.urlencoded({ extended: false }));
app.use(Express.json());

app.use('/images', Express.static(path.join(__dirname, '../client/images')));

app.get('/config', (_: Express.Request, res: Express.Response): void => {
  console.log('PK fetched!');
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post(
  '/create-payment-intent',
  async (req: Express.Request, res: Express.Response): Promise<void> => {
    const {
      currency,
      paymentMethodType,
      paymentMethodOptions,
      amount,
      description,
      registrationIds,
    }: {
      currency: string;
      paymentMethodType: string;
      paymentMethodOptions?: object;
      amount: number;
      description: string;
      registrationIds: string[];
    } = req.body;

    unresolvers.payRegistrations(registrationIds);

    const params: Stripe.PaymentIntentCreateParams = {
      amount,
      currency,
      description,
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
      } as any;
      params.confirm = true;
      params.customer =
        req.body.customerId ||
        (await stripe.customers.create().then((data) => data.id));
    }
    if (paymentMethodOptions) {
      params.payment_method_options = paymentMethodOptions;
    }

    try {
      const paymentIntent: Stripe.PaymentIntent =
        await stripe.paymentIntents.create(params);
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
  },
);

app.get('/payment/next', async (req, res) => {
  const paymentIntent: any = req.query.payment_intent;
  const intent = await stripe.paymentIntents.retrieve(paymentIntent, {
    expand: ['payment_method'],
  });
  res.redirect(`/success?payment_intent_client_secret=${intent.client_secret}`);
});

// app.get('/success', async (req, res) => {
//   // send file for payment success
// })

app.get('/login')

app.post(
  '/webhook',
  bodyParser.raw({ type: 'application/json' }),
  async (req: Express.Request, res: Express.Response): Promise<void> => {
    let event: Stripe.Event;

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

    const data: Stripe.Event.Data = event.data;
    const eventType: string = event.type;

    if (eventType === 'payment_intent.succeeded') {
      const result = await fetch('/graphql', {});
      console.log(result);
      const pi: Stripe.PaymentIntent = data.object as Stripe.PaymentIntent;
      // funds have been captured.  fulfill any orders, e-mail receipts, etc.
      // to cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
      console.log(`Webhook received: ${pi.object} ${pi.status}!`);
      console.log(`Payment captured`);
    } else if (eventType === 'payment_intent.payment_failed') {
      const pi: Stripe.PaymentIntent = data.object as Stripe.PaymentIntent;
      console.log(`Webhook received: ${pi.object} ${pi.status}!`);
      console.log('Payment failed');
    }
  },
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cache: 'bounded',
  // context: authMiddleware
});

if (process.env.NODE_ENV === 'production') {
  app.use(Express.static(path.join(__dirname, '../client/build')));
}

// app.get('/', (_, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at ${server.graphqlPath}`);
    });
  });
};

startApolloServer();
