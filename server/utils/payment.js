import stripe from 'stripe';
const stripe = require('stripe')('your-publishable-key-here');

async function handlePayment() {
// paymentMethodId sent from the client
const paymentMethodId = 'your-payment-method-id';

// Create a payment intent to confirm the payment
const paymentIntent = await stripe.paymentIntents.create({
  amount: totalPrice * 100, // Amount in cents
  currency: 'usd', // Currency code (e.g., 'usd')
  payment_method: paymentMethodId,
  confirm: true,
});

// Handle the payment intent status
if (paymentIntent.status === 'succeeded') {
  // Payment succeeded, you can now fulfill the order
  console.log('Payment succeeded');
} else {
  // Payment failed, handle the error
  console.error('Payment failed:', paymentIntent.last_payment_error);
  res.status(400).json({ error: 'Payment failed' });
  }
}
// Export the function to be used as a route handler
export {handlePayment};
