import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { EventList } from '../components';

// import { Login, Signup, NoMatch, Detail, Success, OrderHistory } from './'

import { StoreProvider } from '../utils/GlobalState';
import { httpLink } from '../utils';

// note: this was an App.js that used as a template; some things, like ApolloProvider, belong in the global context.

// import { Reservations, Events, Cart } from '../components/'

const Events = () => {
  return (
    <div>
      <StoreProvider>
        <EventList />
      </StoreProvider>
    </div>
  );
};

export default Events;
