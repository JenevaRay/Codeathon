import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN, Auth } from '../utils/';

import Button from '../components/ui/Button';
import Bubbles from '../components/ui/Bubbles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [login] = useMutation(LOGIN);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setSubmitError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const mutationResponse = await login({
        variables: { email: email, password: password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (err) {
      setLoading(false);
      setSubmitError(`ERROR: ${err.message}`);
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
        <div className="w-full max-w-lg rounded-lg bg-white shadow-xl dark:border dark:border-gray-700 dark:bg-gray-800 md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Login
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  EMAIL
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
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
                  PASSWORD
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={handlePasswordChange}
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
              {submitError && <p className="text-red-600">{submitError}</p>}
              <div className="py-4">
                <Button
                  type="submit"
                  width="w-full"
                  padding="py-3"
                  borderRadius="rounded-xl"
                  disabled={loading}>
                  {loading ? <Bubbles text="Logging In" /> : 'Log In'}
                </Button>
              </div>
              <p className="text-sm font-light text-gray-700 dark:text-gray-400">
                Don't have an account yet?&nbsp;
                <a
                  href="/signup"
                  className="text-purple dark:text-primary-500 font-medium hover:underline">
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
