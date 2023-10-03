import React from 'react';
import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

  // const { publishableKey } = await fetch('https://codeathon-server-a60585dbdc98.herokuapp.com/config', {
  //   mode: 'cors',
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Headers': '*'
  //   },
  //   method: "GET"
  // }).then((r)=>r.json())
  const stripePromise = loadStripe('pk_test_51NruXOALJQHx596c0W0HHcsnTIsc65iA4GdblCyVQUP0gsq25S8GyEWxDg9J3NzHK3K9by1pfUVU40iWoe5uXHlf00w5UVvh25');
  const container = document.getElementById('root');
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </React.StrictMode>,
  );  