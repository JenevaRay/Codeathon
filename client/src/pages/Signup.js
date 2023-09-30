import { useState } from 'react';
//import { useMutation } from '@apollo/client';
//import { Auth } from '../utils/';

import Button from '../components/ui/Button';
import Bubbles from '../components/ui/Bubbles';

const Signup = () => {
  const [formData, setFormdata] = useState({
    nameFirst: '',
    nameLast: '',
    emailAddress: '',
    password: '',
    submitError: '',
  });

  // const [addUser] = useMutation(ADD_USER)
  // const [addAddress] = useMutation(ADD_ADDRESS)
  // const [addPhone] = useMutation(ADD_PHONE)

  const handleChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormdata({ loading: true });
      //const mutationResponse = await addUser({
      //  variables: {
      //    nameFirst: formData.nameFirst,
      //    nameLast: formData.nameLast,
      //    emailAddress: formData.emailAddress,
      //    password: formData.password,
      //  },
      //});
      //const token = mutationResponse.data.addUser.token;
      //Auth.login(token);
    } catch (err) {
      setFormdata({ loading: false, submitError: err.message });
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="relative z-50 mx-auto flex min-h-screen flex-col items-center justify-center px-6 py-8 lg:py-0">
        <div className="flex flex-col items-center justify-center">
          <a
            href="/"
            className="my-12 text-lg font-extrabold leading-tight text-zinc-900">
            <span className="sr-only">codeathon</span>
            {'</>'} codeathon
          </a>
        </div>
        <div className="w-full max-w-lg rounded-xl bg-white shadow-xl dark:border dark:border-gray-700 dark:bg-gray-800 md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Sign Up
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="nameFirst"
                  className="mb-2 block text-sm font-medium text-gray-900">
                  First Name
                </label>
                <input
                  type="text"
                  name="nameFirst"
                  value={formData.nameFirst}
                  onChange={handleChange}
                  className="focus:border-purple
                m-0
                w-full
                rounded-xl border
                border-solid border-zinc-300 bg-zinc-50
                bg-clip-padding px-4 py-4 text-base
                font-normal
                text-zinc-700
                transition
                  ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                  placeholder="John"
                />
              </div>
              <div>
                <label
                  htmlFor="nameLast"
                  className="mb-2 block text-sm font-medium text-gray-900">
                  Last Name
                </label>
                <input
                  type="text"
                  name="nameLast"
                  value={formData.nameLast}
                  onChange={handleChange}
                  className="focus:border-purple
                m-0
                w-full
                rounded-xl border
                border-solid border-zinc-300 bg-zinc-50
                bg-clip-padding px-4 py-4 text-base
                font-normal
                text-zinc-700
                transition
                  ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                  placeholder="Doe"
                />
              </div>
              <div>
                <label
                  htmlFor="emailAddress"
                  className="mb-2 block text-sm font-medium text-gray-900">
                  Email
                </label>
                <input
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  className="focus:border-purple
                m-0
                w-full
                rounded-xl border
                border-solid border-zinc-300 bg-zinc-50
                bg-clip-padding px-4 py-4 text-base
                font-normal
                text-zinc-700
                transition
                  ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="focus:border-purple
                m-0
                w-full
                rounded-xl border
                border-solid border-zinc-300 bg-zinc-50
                bg-clip-padding px-4 py-4 text-base
                font-normal
                text-zinc-700
                transition
                  ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                />
              </div>
              {formData.submitError && (
                <p className="text-red-600">{formData.submitError}</p>
              )}
              <div className="py-4">
                <Button
                  type="submit"
                  width="w-full"
                  padding="py-3"
                  borderRadius="rounded-xl"
                  disabled={formData.loading}>
                  {formData.loading ? <Bubbles text="Signing Up" /> : 'Sign Up'}
                </Button>
              </div>
              <p className="text-sm font-light text-gray-700 dark:text-gray-400">
                Already have an account?&nbsp;
                <a
                  href="/login"
                  className="text-purple dark:text-primary-500 font-medium hover:underline">
                  Log in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
