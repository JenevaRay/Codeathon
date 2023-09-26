import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { EventList } from '../components'

// import { Login, Signup, NoMatch, Detail, Success, OrderHistory } from './'

import { StoreProvider } from '../utils/GlobalState'

// note: this was an App.js that used as a template; some things, like ApolloProvider, belong in the global context.

// import { Reservations, Events, Cart } from '../components/'

const httpLink = createHttpLink({
  uri: 'http://192.168.56.102:3001/graphql'
})

const authLink = setContext((_, { headers } ) => {
    const token = localStorage.getItem('id_token')
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

const Events = () => {
  return (
    <ApolloProvider client={client} value={[]} >
        <div>
            <StoreProvider>
              <EventList />
            </StoreProvider>
        </div>
    </ApolloProvider>
  )
};

export default Events;
