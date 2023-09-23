const Navbar = ({ logged_in }) => {
  return (
    <nav
      className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      aria-label="Navbar">
      <div className="flex lg:flex-1">
        <a
          href="/"
          className="text-md -m-1.5 p-1.5 font-bold text-zinc-900">
          <span className="sr-only">Codeathon</span>
          &lt;codeathon/&gt;
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
          <a
            onClick="#"
            href="/"
            className="cursor-pointer text-sm font-semibold leading-6 text-gray-900">
            Log out
            <span aria-hidden="true">&rarr;</span>
          </a>
        ) : (
          <a
            href="/login"
            className="text-sm font-semibold leading-6 text-gray-900">
            Log in
            <span aria-hidden="true">&rarr;</span>
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
