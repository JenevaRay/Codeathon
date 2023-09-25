import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Checkout from './pages/Checkout';

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
            path="/checkout"
            element={<Checkout />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
