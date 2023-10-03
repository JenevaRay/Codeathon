import { useReducer, useState } from 'react';
import dayjs from 'dayjs';
import { ADD_REGISTRATION_TO_CART } from '../utils/actions';
import { ADD_REGISTRATION } from '../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';
import { useStoreContext, QUERY_EVENTS, Auth, StoreProvider } from '../utils/';

import Button from './ui/Button';

// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe(
//   'pk_test_51NsbiVI8fwprByGXBlusUK1tdXtpnvnrHTggpoweDmVgEAigbLMOhupqLWZgVv4IEjICMyfRBDKJv2OSc2DCcBSH003DL7HRgO',
// );

const EventList = () => {
  const query_info = useQuery(QUERY_EVENTS);
  const [state, dispatch] = useStoreContext();
  const [register, mutation_info] = useMutation(ADD_REGISTRATION);
  const { /* data, loading,*/ error } = mutation_info;
  // console.log(state)

  const registerForEvent = async (eventId) => {
    // calling this throws an ApolloError, is this cacheing at work?
    const profile = Auth.loggedIn() ? Auth.getProfile() : undefined;
    if (profile.data) {
      if (profile.data._id) {
        const userId = profile.data._id;
        try {
          const mutationResponse = await register({
            variables: { eventId, userId },
          });
          const { data } = mutationResponse;
          // console.log(mutationResponse)
          if (data) {
            dispatch({
              type: ADD_REGISTRATION_TO_CART,
              payload: data.addRegistration._id,
            });
          }
          // turn this off when improving this function...
          window.location.assign('/checkout');
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  // const handleStripeCheckout = () => {
  //   // Redirects the user to the Stripe Checkout page
  //   window.location.href = 'https://buy.stripe.com/test_14k6oo8KK5ER8bS3cd';
  // };

  // Handles the checkout process
  const handleCheckout = async (eventId, cost) => {
    // Create a new Stripe session on the server
    const { data } = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventId,
        cost: 75.0,
      }),
    }).then((res) => res.json());

    // Redirect the user to the Stripe checkout page
    // const stripe = await stripePromise;
    // const { error } = await stripe.redirectToCheckout({
    //   sessionId: data.sessionId,
    // });

    // Handle any errors that occur during the redirect.
    if (error) {
      console.error(error);
    }
  };

  if (query_info.loading) return 'Loading...';
  if (query_info.error) return `Error! ${query_info.error.message}`;

  //   const { currentEvent } = state;
  //   console.log(data.events[0]);

  const strToDayJS = (unixEpochStr) => dayjs(new Date(Number(unixEpochStr)));
  const events = query_info.data.events.map((event) => {
    // registrations must be submitted before event.dateCutoff
    const expiry =
      strToDayJS(event.dateStart) > dayjs(Date.now())
        ? 'FUTURE'
        : strToDayJS(event.dateEnd) > dayjs(Date.now())
        ? 'CURRENT'
        : strToDayJS(event.dateCutoff) < dayjs(Date.now())
        ? 'OVERDUE'
        : 'EXPIRED';
    const costStr = String(event.feeRegistration + event.feeVenue);
    const cost = ['$', costStr.slice(0, -2), '.', costStr.slice(2)];
    if (['OVERDUE', 'EXPIRED'].includes(expiry)) {
      // omit expired events
      // TODO: (luxury) do this in the SERVER side, so we are transmitting less info, and potentially even QUERYING less info.
      // returning this instead of <></> because
      return <div key={event._id}></div>;
    } else
      return (
        <StoreProvider value={[state, dispatch]}>
          <div
            key={event._id}
            className="mx-10 mb-16 max-w-lg flex-1 rounded-xl bg-white p-6 shadow-xl">
            <h5 className="mb-4 text-xl font-bold leading-tight text-zinc-900">
              {event.name}
            </h5>
            <p className="text-base leading-loose text-zinc-800">
              <strong>HOST:</strong> {event.organizerUserId.nameFirst}{' '}
              {event.organizerUserId.nameLast}
              <br />
              <strong>DATE:</strong>{' '}
              {strToDayJS(event.dateStart).format('MM/DD/YYYY [@] h:mma')} -{' '}
              {strToDayJS(event.dateEnd).format('MM/DD/YYYY [@] h:mma')}
              <br />
              <strong>REGISTERED:</strong> {event.registrations.length}
            </p>
            {/* <div>
              <div
                key={event._id}
                className="event-card">
                <h3>{event.name}</h3>
                <button onClick={handleStripeCheckout}>Pay Now</button>
              </div>
            </div> */}

            {expiry === 'FUTURE' ? (
              // <Elements stripe={stripePromise}>
              <Button
                value={event._id}
                margin="mt-4"
                width="w-full"
                padding="py-2"
                onClick={(e) => {
                  // window.location.assign('/checkout')
                  registerForEvent(event._id);
                  // handleCheckout(event._id, cost);
                  // console.log(event);
                }}>
                Register {cost}
              </Button>
            ) : (
              // </Elements>
              <Button
                value={event._id}
                margin="mt-4"
                width="w-full"
                padding="py-2"
                bgColor="bg-zinc-900/50"
                disabled={true}
                animations={false}>
                Event Expired
              </Button>
            )}
          </div>
        </StoreProvider>
      );
  });

  return (
    <div className="mt-16 flex flex-wrap items-center justify-center">
      {events}
    </div>
  );
};

export default EventList;
