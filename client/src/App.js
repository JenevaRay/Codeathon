import { Routes, Route, BrowserRouter } from 'react-router-dom';

<<<<<<< HEAD
import { Layout } from './components';
import { Home, Events, Checkout } from './pages';
// will fix the imports shortly (add to pages/index.js)
=======
import Layout from './components/Layout';
import { Home, Events, Registration, Checkout } from './pages/';
>>>>>>> 75d5bc21fdc0f50b844c12ace2c18a51556270db

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
