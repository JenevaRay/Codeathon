import Button from '../components/ui/Button';

const Navbar = ({ logged_in }) => {
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
      <div className="flex gap-x-12">
        <a
          href="/"
          className="text-sm font-semibold leading-6 text-zinc-900">
          Home
        </a>
        <a
          href="/dashboard"
          className="text-sm font-semibold leading-6 text-gray-900">
          Dashboard
        </a>
      </div>
      <div className="flex lg:flex-1 lg:justify-end">
        {logged_in ? (
          <a href="/logout">
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