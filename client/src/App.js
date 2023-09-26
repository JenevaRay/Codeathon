import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import { Home, Events, Checkout } from './pages/index.js';
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
            path='/events'
            element={<Events />}
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
