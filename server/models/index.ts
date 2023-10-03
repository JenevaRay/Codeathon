// Import all models
import { User } from './User';
import { Venue } from './Venue';
import { Registration } from './Registration';
import { Event } from './Event';
import { Group } from './Group';
// import { Address } from './Address';
// import { Phone } from './Phone';
import dayjs from 'dayjs';
import { Stripe } from 'stripe'; // Import Stripe library
import { Request, Response } from 'express';

// Define a schema version and a schema date for future compatibility
const schemaVersion = '0.0.6';
const schemaDate = dayjs('2023-09-28');

const stripe = new Stripe('your-secret-key-here', {
  apiVersion: '2023-08-16',
});

async function handlePayment(req: Request, res: Response) {
  const paymentMethodId = req.body.paymentMethodId; // You should parse this from the request body

  try {
    // Create a payment intent to confirm the payment
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // Amount in cents
      currency: 'usd', // Currency code (e.g., 'usd')
      payment_method: paymentMethodId,
      confirm: true,
    });

    // Handle the payment intent status
    if (paymentIntent.status === 'succeeded') {
      // Payment succeeded, you can now fulfill the order
      console.log('Payment succeeded');
      res.status(200).json({ message: 'Payment succeeded' });
    } else {
      // Payment failed, handle the error
      console.error('Payment failed:', paymentIntent.last_payment_error);
      res.status(400).json({ error: 'Payment failed' });
    }
  } catch (error) {
    // Handle other errors (e.g., Stripe API errors)
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

// Export all models plus the schema version and schema date
export {
  User,
  Venue,
  Registration,
  Event,
  Group,
  // Address,
  // Phone,
  schemaVersion,
  schemaDate,
  handlePayment,
};
