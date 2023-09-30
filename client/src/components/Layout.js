import { useLocation } from 'react-router-dom';

import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  let { pathname } = useLocation();

  return (
    <>
      {pathname === '/checkout' ? null : pathname ===
        '/login' ? null : pathname === '/signup' ? null : (
        <Navbar />
      )}
      <main className="w-full">{children}</main>
      {pathname === '/checkout' ? null : pathname ===
        '/login' ? null : pathname === '/signup' ? null : (
        <Footer />
      )}
    </>
  );
};

export default Layout;
