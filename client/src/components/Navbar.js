import Button from '../components/ui/Button';
import { Auth } from '../utils';
// import { Link } from 'react-router-dom'

const Navbar = ({ logged_in }) => {
  let navItems = []
  if (Auth.loggedIn()) {
    navItems.push("Home")
    navItems.push("Dashboard")
    navItems.push("Events")
    navItems.push("Registration")
    navItems.push("Checkout")
  } else {
    navItems.push("Home")
    navItems.push("Events")
  }
  const elements = navItems.map((item)=>{
    const className = "text-sm font-semibold leading-6 text-gray-900"
    if (item === "Logout") {
      return (<a key={item} href="/" onClick={() => Auth.logout()} className={className}>{item}</a>)
    } else return (<a key={item} href={"/" + item.toLowerCase()} className={className}>{item}</a>)
  })
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
        {elements}
        {/* <a
          href="/"
          className="text-sm font-semibold leading-6 text-zinc-900">
          Home
        </a>
        <a
          href="/dashboard"
          className="text-sm font-semibold leading-6 text-gray-900">
          Dashboard
        </a>
        <a
          href="/login"
          className="text-sm font-semibold leading-6 text-gray-900">
          Login
        </a> */}
        {/* <a
          href="/events"
          className="text-sm font-semibold leading-6 text-gray-900">
          Events
        </a> */}
        {/* <a
          href="/registration"
          className="text-sm font-semibold leading-6 text-gray-900">
          Registration
        </a> */}
        {/* <a
          href="/checkout"
          className="text-sm font-semibold leading-6 text-gray-900">
          Checkout
        </a> */}
        {/*             element={<Home />}
          />
 */}
      </div>
      <div className="flex lg:flex-1 lg:justify-end">
        {Auth.loggedIn() ? (
          <a href="/" onClick={() => Auth.logout()}><Button>Logout</Button></a>
          // <a href="/logout">
          //   <Button>Logout</Button>
          // </a>
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
