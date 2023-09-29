import Button from '../components/ui/Button';
import { Auth } from '../utils';

const Navbar = () => {
  return (
    <nav
      className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      aria-label="Navbar">
      <div className="flex lg:flex-1">
        <a
          href="/"
          className="-m-1.5 p-1.5 text-lg font-extrabold leading-tight text-zinc-900">
          <span className="sr-only">codeathon</span>
          {'</>'} codeathon
        </a>
      </div>
      {Auth.loggedIn() && (
        <div className="hidden gap-x-12 md:flex">
          <a
            href="/dashboard"
            className="text-sm font-semibold leading-6 text-zinc-900">
            Dashboard
          </a>
          <a
            href="/events"
            className="text-sm font-semibold leading-6 text-gray-900">
            Events
          </a>
          <a
            href="/registration"
            className="text-sm font-semibold leading-6 text-gray-900">
            Registration
          </a>
          <a
            href="/checkout"
            className="text-sm font-semibold leading-6 text-gray-900">
            Checkout
          </a>
        </div>
      )}
      <div className="hidden md:flex md:flex-1 md:justify-end">
        {Auth.loggedIn() ? (
          <a
            href="/"
            onClick={() => Auth.logout()}>
            <Button>Logout</Button>
          </a>
        ) : (
          <a href="/login">
            <Button>Login</Button>
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
