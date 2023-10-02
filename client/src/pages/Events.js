import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { EventList } from '../components';

// import { Login, Signup, NoMatch, Detail, Success, OrderHistory } from './'


import { httpLink } from '../utils';

// note: this was an App.js that used as a template; some things, like ApolloProvider, belong in the global context.

// import { Reservations, Events, Cart } from '../components/'

const Events = () => {
  return (
    <EventList />
  );
};

export default Events;
