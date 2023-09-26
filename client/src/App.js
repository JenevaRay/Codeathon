import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { Layout } from './components';
import { Home, Events, Login, Registration, Checkout } from './pages';
// will fix the imports shortly (add to pages/index.js)

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
            path="registration"
            element={<Registration />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
