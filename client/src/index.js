import React from 'react';
import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

document.addEventListener('DOMContentLoaded', async () => {
  const publishableKey =
    'pk_test_51NruXOALJQHx596c0W0HHcsnTIsc65iA4GdblCyVQUP0gsq25S8GyEWxDg9J3NzHK3K9by1pfUVU40iWoe5uXHlf00w5UVvh25';
  const stripePromise = loadStripe(publishableKey);

  const container = document.getElementById('root');
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </React.StrictMode>,
  );
});
