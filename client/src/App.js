import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import { Home, Events } from './pages/index.js';

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
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
