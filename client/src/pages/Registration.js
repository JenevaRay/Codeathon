import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { RegistrationList } from '../components';
import { httpLink } from '../utils';

// import { Login, Signup, NoMatch, Detail, Success, OrderHistory } from './'

import { StoreProvider } from '../utils/GlobalState';

// note: this was an App.js that used as a template; some things, like ApolloProvider, belong in the global context.

// import { Reservations, Events, Cart } from '../components/'

const Events = () => {
  return (
    <RegistrationList />
  );
};

export default Events;
