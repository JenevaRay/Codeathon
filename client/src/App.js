import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import { Home, Events, Registration, Checkout } from './pages/';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<Home />}
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
            path="registration"
            element={<Registration />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
