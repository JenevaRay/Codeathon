// import { useReducer, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import dayjs from 'dayjs';

import { ADD_REGISTRATION_TO_CART } from '../utils/actions';
import { ADD_REGISTRATION } from '../utils/mutations';
import { QUERY_EVENTS } from '../utils/queries';

import { useStoreContext, StoreProvider } from '../utils/GlobalState';

import Auth from '../utils/Auth';

import Button from './ui/Button';

const EventList = () => {
  const query_info = useQuery(QUERY_EVENTS);
  const [state, dispatch] = useStoreContext();
  const [register, mutation_info] = useMutation(ADD_REGISTRATION);
  // const { data, loading, error } = mutation_info;
  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

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

  if (query_info.loading) return 'Loading...';
  if (query_info.error) return `Error! ${query_info.error.message}`;

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
    const cost = USDollar.format(costStr/100)
    if (['OVERDUE', 'EXPIRED'].includes(expiry)) {
      // omit expired events
      // TODO: (luxury) do this in the SERVER side, so we are transmitting less info, and potentially even QUERYING less info.
      // returning this instead of <></> because key is required
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
            {expiry === 'FUTURE' ? (
              <Button
                value={event._id}
                margin="mt-4"
                width="w-full"
                padding="py-2"
                onClick={(e) => {
                  registerForEvent(event._id);
                }}>
                Register to Attend for {cost}
              </Button>
            ) : (
              <Button
                value={event._id}
                margin="mt-4"
                width="w-full"
                padding="py-2"
                bgColor="bg-zinc-900/50"
                disabled={true}
                animations={false}>
                No New Registrations
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
