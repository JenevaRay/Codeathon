import { useState } from 'react';
import { motion } from 'framer-motion';

import Button from '../components/ui/Button';

import Auth from '../utils/Auth'

import {
  svgPathVariant1,
  svgPathVariant2,
  firstVariant,
  secondVariant,
  thirdVariant,
  fourthVariant,
  fifthVariant,
  sixthVariant,
  seventhVariant,
} from '../utils/constants';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [animation, setAnimation] = useState('closed');
  const handleNav = () => {
    setNav(!nav);
    setTimeout(() => {
      setAnimation(animation === 'closed' ? 'open' : 'closed');
    }, 100);
  };
  return (
    <nav
      className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      aria-label="Navbar">
      <div className="flex md:flex-1">
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
            className="text-sm font-semibold leading-6 text-zinc-900">
            Events
          </a>
          <a
            href="/registration"
            className="text-sm font-semibold leading-6 text-zinc-900">
            Registration
          </a>
          <a
            href="/checkout"
            className="text-sm font-semibold leading-6 text-zinc-900">
            Checkout
          </a>
        </div>
      )}
      <div className="z-50 flex flex-1 justify-end md:hidden">
        <div
          className="cursor-pointer"
          onClick={handleNav}>
          <svg
            width="29"
            height="29"
            viewBox="0 0 29 29">
            <motion.path
              stroke="currentColor"
              animate={animation}
              variants={svgPathVariant1}
            />
            <motion.path
              stroke="currentColor"
              animate={animation}
              variants={svgPathVariant2}
            />
          </svg>
        </div>
      </div>
      <ul
        className={
          nav
            ? 'fixed left-0 top-0 z-40 flex h-screen w-full flex-col items-center justify-center bg-zinc-50 duration-500 ease-in-out'
            : 'fixed left-[-100%] top-0 z-40 flex h-screen w-full flex-col items-center justify-center bg-zinc-50 duration-500 ease-in-out'
        }>
        <motion.li
          animate={nav ? 'open' : 'closed'}
          variants={firstVariant}
          className="fixed top-20 inline-flex p-4">
          <a
            href="/"
            aria-label="Codeathon | Home Page"
            className="-m-1.5 p-1.5 text-lg font-extrabold leading-tight text-zinc-900"
            onClick={handleNav}>
            <span className="sr-only">codeathon</span>
            {'</>'} codeathon
          </a>
        </motion.li>
        <li className="w-full p-4 text-center text-2xl text-zinc-900 hover:text-purple-600">
          <motion.div
            animate={nav ? 'open' : 'closed'}
            variants={secondVariant}>
            <a
              className="transition duration-150 ease-in-out"
              href="/"
              aria-label="Codeathon | Home Page"
              onClick={handleNav}>
              Home
            </a>
          </motion.div>
        </li>
        <li className="w-full p-4 text-center text-2xl text-zinc-900 hover:text-purple-600">
          <motion.div
            animate={nav ? 'open' : 'closed'}
            variants={thirdVariant}>
            <a
              className="transition duration-150 ease-in-out"
              href="/dashboard"
              aria-label="Codeathon | Dashboard Page"
              onClick={handleNav}>
              Dashboard
            </a>
          </motion.div>
        </li>
        <li className="w-full p-4 text-center text-2xl text-zinc-900 hover:text-purple-600">
          <motion.div
            animate={nav ? 'open' : 'closed'}
            variants={fourthVariant}>
            <a
              className="transition duration-150 ease-in-out"
              href="/events"
              aria-label="Codeathon | Events Page"
              onClick={handleNav}>
              Events
            </a>
          </motion.div>
        </li>
        <li className="w-full p-4 text-center text-2xl text-zinc-900 hover:text-purple-600">
          <motion.div
            animate={nav ? 'open' : 'closed'}
            variants={fifthVariant}>
            <a
              className="transition duration-150 ease-in-out"
              href="/registration"
              onClick={handleNav}
              aria-label="Codeathon | Registration Page">
              Registration
            </a>
          </motion.div>
        </li>
        <li className="w-full text-center text-2xl text-zinc-900 hover:text-purple-600">
          <motion.div
            animate={nav ? 'open' : 'closed'}
            variants={sixthVariant}>
            <a
              className="transition duration-150 ease-in-out"
              href="/checkout"
              aria-label="Codeathon | Checkout Page"
              onClick={handleNav}>
              Checkout
            </a>
          </motion.div>
        </li>
        <div className="fixed bottom-20 flex flex-col items-center justify-center p-4">
          <motion.div
            animate={nav ? 'open' : 'closed'}
            variants={seventhVariant}>
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
          </motion.div>
        </div>
      </ul>
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
