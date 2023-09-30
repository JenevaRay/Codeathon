import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Auth } from '../utils/';
import Button from '../components/ui/Button';

// TODO: additional forms for address(es), phone(s)

const Signup = () => {
  const [submitError, setSubmitError] = useState('');
  const [formState, setFormState] = useState({
    nameFirst: '',
    nameLast: '',
    emailAddress: '',
    password: '',
  });
  // const [addUser] = useMutation(ADD_USER)
  // const [addAddress] = useMutation(ADD_ADDRESS)
  // const [addPhone] = useMutation(ADD_PHONE)

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);
    // const mutationResponse = await addUser({
    //     variables: {
    //         nameFirst: formState.nameFirst,
    //         nameLast: formState.nameLast,
    //         email: formState.email,
    //         emailType: formState.emailType,
    //         otherContactMethod: formState.otherContactMethod,
    //         preferredContactMethod: formState.preferredContactMethod,
    //         password: formState.password
    //     }
    // })
    // const token = mutationResponse.data.addUser.token
    // Auth.login(token)
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="relative z-50 mx-auto flex min-h-screen flex-col items-center justify-center px-6 py-8 lg:py-0">
        <div className="flex flex-col items-center justify-center">
          <a
            href="/"
            className="my-12 text-2xl font-extrabold leading-tight text-zinc-900">
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
              onSubmit={handleFormSubmit}>
              <div>
                <label
                  htmlFor="nameFirst"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  First Name
                </label>
                <input
                  type="text"
                  name="nameFirst"
                  value={formState.nameFirst}
                  onChange={handleChange}
                  className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                  placeholder="First Name"
                />
              </div>
              <div>
                <label
                  htmlFor="nameLast"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Last Name
                </label>
                <input
                  type="text"
                  name="nameLast"
                  value={formState.nameLast}
                  onChange={handleChange}
                  className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                  placeholder="Last Name"
                />
              </div>
              {/* We can change emailType to a drowdown. */}
              <div>
                <label
                  htmlFor="emailType"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Email Type
                </label>
                <input
                  type="text"
                  name="emailType"
                  value={formState.emailType}
                  onChange={handleChange}
                  className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                  placeholder="Email Type"
                />
              </div>
              <div>
                <label
                  htmlFor="preferredContactMethod"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Preferred Contact Method
                </label>
                <input
                  type="text"
                  name="preferredContactMethod"
                  value={formState.preferredContactMethod}
                  onChange={handleChange}
                  className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                  placeholder="Preferred Contact Method"
                />
              </div>
              <div>
                <label
                  htmlFor="otherContactMethod"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Other Contact Method
                </label>
                <input
                  type="text"
                  name="otherContactMethod"
                  value={formState.otherContactMethod}
                  onChange={handleChange}
                  className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                  placeholder="Other Contact Method"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Phone #
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                  className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                  placeholder="Phone #"
                />
              </div>
              <div>
                <div>
                  <label
                    htmlFor="streetAddress"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Address
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={formState.streetAddress}
                    onChange={handleChange}
                    className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                    placeholder="Street Address"
                  />
                  <input
                    type="text"
                    name="extendedAddress"
                    value={formState.streetAddress}
                    onChange={handleChange}
                    className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                    placeholder="Extended Address"
                  />
                </div>
                <div>
                  <label
                    htmlFor="country"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formState.country}
                    onChange={handleChange}
                    className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                    placeholder="Country"
                  />
                </div>
                <div>
                  <label
                    htmlFor="state"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formState.state}
                    onChange={handleChange}
                    className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                    placeholder="State"
                  />
                </div>
                <div>
                  <label
                    htmlFor="county"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    County
                  </label>
                  <input
                    type="text"
                    name="county"
                    value={formState.county}
                    onChange={handleChange}
                    className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                    placeholder="County"
                  />
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formState.city}
                    onChange={handleChange}
                    className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label
                    htmlFor="postalCode"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formState.postalCode}
                    onChange={handleChange}
                    className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                    placeholder="Postal Code"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  EMAIL
                </label>
                <input
                  type="email"
                  name="email"
                  value={formState.email}
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
                  PASSWORD
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formState.password}
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
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      aria-describedby="remember"
                      type="checkbox"
                      className="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="/"
                  className="text-sm font-medium text-gray-700 hover:underline">
                  Forgot Password?
                </a>
              </div>
              {/* <Button
                type="submit"
                width="w-full"
                borderRadius="rounded-md"
                // disabled={loading}
                >
                Log in
              </Button> */}
              <button
                type="submit"
                className="bg-purple hover:bg-purpleDark w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white hover:shadow-lg focus:outline-none"
                // disabled={loading}>
              >
                Sign in
              </button>
              {submitError && <p>{submitError}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [submitError, setSubmitError] = useState('');
//   const [login, { error }] = useMutation(LOGIN);

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setSubmitError(''); // This would be for a unsuccessful response from the backend etc
//     console.log('Logging in...');
//     try {
//       const mutationResponse = await login({
//         variables: { email: email, password: password },
//       });
//       const token = mutationResponse.data.login.token;
//       Auth.login(token);
//     } catch (err) {
//       console.log(err);
//       console.log(error);
//     }
//   };

//   return (
//     <div className="relative h-full w-full overflow-hidden bg-zinc-50">
//       <div className="absolute inset-0 aspect-square opacity-5">
//         <img
//           src="https://img.freepik.com/premium-vector/seamless-pattern-abstract-background-with-futuristic-style-use-business-cover-banner_7505-1820.jpg"
//           alt="background"
//           // the following line throws an error, fill wants a string.
//           fill="true"
//         />
//       </div>
//       <div className="relative z-50 mx-auto flex min-h-screen flex-col items-center justify-center px-6 py-8 lg:py-0">
//         <div className="flex flex-col items-center justify-center">
//           <a
//             href="/"
//             className="my-12 text-lg font-extrabold leading-tight text-zinc-900">
//             <span className="sr-only">codeathon</span>
//             {'</>'} codeathon
//           </a>
//         </div>
//         <div className="w-full max-w-lg rounded-lg bg-white shadow-xl dark:border dark:border-gray-700 dark:bg-gray-800 md:mt-0 xl:p-0">
//           <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
//             <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
//               Login
//             </h1>
//             <form
//               className="space-y-4 md:space-y-6"
//               onSubmit={handleLogin}>
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
//                   EMAIL
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={email}
//                   onChange={handleEmailChange}
//                   className="focus:border-purple
//                 m-0
//                 w-full
//                 rounded-xl border
//                 border-solid border-zinc-300 bg-zinc-50
//                 bg-clip-padding px-4 py-4 text-base
//                 font-normal
//                 text-zinc-700
//                 transition
//                   ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
//                   placeholder="email@example.com"
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="password"
//                   className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
//                   PASSWORD
//                 </label>
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="••••••••"
//                   value={password}
//                   onChange={handlePasswordChange}
//                   className="focus:border-purple
//                 m-0
//                 w-full
//                 rounded-xl border
//                 border-solid border-zinc-300 bg-zinc-50
//                 bg-clip-padding px-4 py-4 text-base
//                 font-normal
//                 text-zinc-700
//                 transition
//                   ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
//                 />
//               </div>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-start">
//                   <div className="flex h-5 items-center">
//                     <input
//                       aria-describedby="remember"
//                       type="checkbox"
//                       className="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
//                     />
//                   </div>
//                   <div className="ml-3 text-sm">
//                     <label
//                       htmlFor="remember"
//                       className="text-gray-500 dark:text-gray-300">
//                       Remember me
//                     </label>
//                   </div>
//                 </div>
//                 <a
//                   href="/"
//                   className="text-sm font-medium text-gray-700 hover:underline">
//                   Forgot Password?
//                 </a>
//               </div>
//               <button
//                 type="submit"
//                 className="bg-purple hover:bg-purpleDark w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white hover:shadow-lg focus:outline-none"
//                 disabled={loading}>
//                 Sign in
//               </button>
//               <p className="text-sm font-light text-gray-700 dark:text-gray-400">
//                 Don't have an account yet?&nbsp;
//                 <a
//                   href="/signup"
//                   className="text-purple dark:text-primary-500 font-medium hover:underline">
//                   Sign up
//                 </a>
//               </p>
//               {submitError && <p>{submitError}</p>}
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default Signup;

/*
regression code, not even onSubmit would work.


import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN, Auth } from '../utils/';

import Button from '../components/ui/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [login, { error }] = useMutation(LOGIN);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError(''); // This would be for a unsuccessful response from the backend etc
    console.log('Logging in...');
    try {
      const mutationResponse = await login({
        variables: { email: email, password: password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (err) {
      console.log(err);
      console.log(error);
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
//     <div className="relative h-full w-full overflow-hidden bg-zinc-50">
//       <div className="absolute inset-0 aspect-square opacity-5">
//         <img
//           src="https://img.freepik.com/premium-vector/seamless-pattern-abstract-background-with-futuristic-style-use-business-cover-banner_7505-1820.jpg"
//           alt="background"
//           // the following line throws an error, fill wants a string.
//           fill="true"
//         />
//       </div>
      <div className="relative z-50 mx-auto flex min-h-screen flex-col items-center justify-center px-6 py-8 lg:py-0">
        <div className="flex flex-col items-center justify-center">
          <a
            href="/"
            className="my-12 text-2xl font-extrabold leading-tight text-zinc-900">
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
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      aria-describedby="remember"
                      type="checkbox"
                      className="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="/"
                  className="text-sm font-medium text-gray-700 hover:underline">
                  Forgot Password?
                </a>
              </div>
              <Button
                type="submit"
                width="w-full"
                borderRadius="rounded-md"
                disabled={loading}>
                Log in
              </Button>
              <p className="text-sm font-light text-gray-700 dark:text-gray-400">
                Don't have an account yet?&nbsp;
                <a
                  href="/signup"
                  className="text-purple dark:text-primary-500 font-medium hover:underline">
                  Sign up
                </a>
              </p>
              {submitError && <p>{submitError}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
*/
