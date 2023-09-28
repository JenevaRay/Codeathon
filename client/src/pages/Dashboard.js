import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// import { AddEvent } from '../components/AddEvent'
// import { Login, Signup, NoMatch, Detail, Success, OrderHistory } from './'

import { StoreProvider } from '../utils/GlobalState';
// import { httpLink } from '../utils';
import { MyEventList, AddEvent } from '../components';


// note: this was an App.js that used as a template; some things, like ApolloProvider, belong in the global context.

// import { Reservations, Events, Cart } from '../components/'

const Dashboard = () => {
  return (
    <div>
      <StoreProvider>
        <MyEventList />
        <AddEvent />
      </StoreProvider>
    </div>
  );
};

export default Dashboard;
