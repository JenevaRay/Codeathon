import dotenv from 'dotenv';
dotenv.config();

import Express from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
// import { AuthMiddleware } from './utils/auth'
import bodyParser from 'body-parser'
import { typeDefs, resolvers } from './schemas/index';
import { db } from './config/connection';

import Stripe from 'stripe';

const app = Express();

// Stripe payment info inspired by https://github.com/stripe-samples/accept-a-payment

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Must have STRIPE SECRET KEY")
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "MUST USE SECRET", {  
  apiVersion: '2023-08-16',
  appInfo: {
    name: "codeathon-demo-app/accept-a-payment",
    url: "https://codeathon-1b48b4588e47.herokuapp.com",
    version: "0.0.1"
  },
  typescript: true
})

app.use(
  (
    req: Express.Request, 
    res: Express.Response,
    next: Express.NextFunction
  ): void => {
    if (req.originalUrl === '/webhook') {
      next()
    } else {
      bodyParser.json()(req, res, next)
    }
  }
)

app.get("/config", (_: Express.Request, res: Express.Response): void => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
  })
})

app.get("/create-payment-intent", async (_: Express.Request, res: Express.Response): Promise<void> => {
  const params: Stripe.PaymentIntentCreateParams = {
    amount: 1999,
    currency: 'USD',
    automatic_payment_methods: {
      enabled: true
    }
  }

  try {
    const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create(params)
    res.send({ clientSecret: paymentIntent.client_secret })
  } catch (e) {
    res.status(400).send({
      error: {
        message: e.message
      }
    })
  }
})

app.post("/webhook", bodyParser.raw({ type: "application/json" }), 
  async (req: Express.Request, res: Express.Response): Promise<void> => {
    let event: Stripe.Event
    const headers = req.headers["stripe-signature"]
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        headers || '',
        process.env.STRIPE_WEBHOOK_SECRET || ''
      )
    } catch (err) {
      console.log(`Webhook signature verification failed!`)
      res.sendStatus(400)
      return
    }

    const data: Stripe.Event.Data = event.data
    const eventType: string = event.type

    if (eventType === "payment_intent.succeeded") {
      const pi: Stripe.PaymentIntent = data.object as Stripe.PaymentIntent
      // funds have been captured.  fulfill any orders, e-mail receipts, etc.
      // to cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
      console.log(`Webhook received: ${pi.object} ${pi.status}!`)
      console.log(`Payment captured`)
    } else if (eventType === "payment_intent.payment_failed") {
      const pi: Stripe.PaymentIntent = data.object as Stripe.PaymentIntent
      console.log(`Webhook received: ${pi.object} ${pi.status}!`)
      console.log("Payment failed")
    }
  }
)

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: authMiddleware
});

app.use(Express.urlencoded({ extended: false }));
app.use(Express.json());

app.use('/images', Express.static(path.join(__dirname, '../client/images')));

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
      console.log(
        `Use GraphQL at ${server.graphqlPath}`,
      );
    });
  });
};

startApolloServer();
