import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { Layout } from './components';
import { Home, Dashboard, Events, Login, Signup, Registration, Checkout } from './pages';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { StoreProvider, httpLink } from './utils';
import { setContext } from '@apollo/client/link/context';

import * as PaymentMethods from './payment/methods'
import List from './payment/List';

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
              <Route path="/signup" element={<Signup />} />
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
              <Route path="/payment" element={<List />} />
              <Route path="/payment/alipay" element={<PaymentMethods.Alipay />} />
              <Route path="/payment/acss-debit" element={<PaymentMethods.AcssDebit />} />
              <Route path="/payment/us-bank-account-debit" element={<PaymentMethods.UsBankAccountDebit />} />
              <Route path="/payment/apple-pay" element={<PaymentMethods.ApplePay />} />
              <Route path="/payment/afterpay-clearpay" element={<PaymentMethods.AfterpayClearpay />} />
              <Route path="/payment/bancontact" element={<PaymentMethods.Bancontact />} />
              <Route path="/payment/becs-debit" element={<PaymentMethods.BecsDebit />} />
              <Route path="/payment/boleto" element={<PaymentMethods.Boleto />} />
              <Route path="/payment/card" element={<PaymentMethods.Card />} />
              <Route path="/payment/eps" element={<PaymentMethods.Eps />} />
              <Route path="/payment/fpx" element={<PaymentMethods.Fpx />} />
              <Route path="/payment/giropay" element={<PaymentMethods.Giropay />} />
              <Route path="/payment/grabpay" element={<PaymentMethods.GrabPay />} />
              <Route path="/payment/google-pay" element={<PaymentMethods.GooglePay />} />
              <Route path="/payment/ideal" element={<PaymentMethods.Ideal />} />
              <Route path="/payment/klarna" element={<PaymentMethods.Klarna />} />
              <Route path="/payment/oxxo" element={<PaymentMethods.Oxxo />} />
              <Route path="/payment/p24" element={<PaymentMethods.P24 />} />
              <Route path="/payment/sepa-debit" element={<PaymentMethods.SepaDebit />} />
              <Route path="/payment/sofort" element={<PaymentMethods.Sofort />} />
              <Route path="/payment/wechat-pay" element={<PaymentMethods.WeChatPay />} />
              <Route path="/payment/konbini" element={<PaymentMethods.Konbini />} />
              <Route path="/payment/jp-bank-transfer" element={<PaymentMethods.JPBankTransfer />} />
            </Routes>
          </Layout>
        </StoreProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default App;
