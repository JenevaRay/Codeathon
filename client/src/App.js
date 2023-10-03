import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import { setContext } from '@apollo/client/link/context'

import Layout from './components/Layout'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Events from './pages/Events'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Registration from './pages/Registration'
import Checkout from './pages/Checkout'

import { StoreProvider } from './utils/GlobalState'
import httpLink from './utils/httpLink'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <BrowserRouter>
      <ApolloProvider
        client={client}
        value={{ events: [] }}>
        <StoreProvider>
          <Layout>
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/dashboard"
                element={<Dashboard />}
              />
              <Route
                path="/signup"
                element={<Signup />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/events"
                element={<Events />}
              />
              <Route
                path="/checkout"
                element={<Checkout />}
              />
              <Route
                path="/registration"
                element={<Registration />}
              />
            </Routes>
          </Layout>
        </StoreProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default App;
