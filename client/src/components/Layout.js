import { useLocation } from 'react-router-dom';

import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  let location = useLocation();

  return (
    <>
      {location.pathname === '/checkout' ? null : <Navbar />}
      <main className="w-full">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
