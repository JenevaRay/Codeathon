// import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';

import { MyEventList, /* EventList,*/ AddEvent } from '../components';
// import { useState } from 'react';
// import { useMutation, useQuery } from '@apollo/client';
// import { useStoreContext, QUERY_EVENTS, LOGIN, Auth } from '../utils/';

// import Button from '../components/ui/Button';
// import Bubbles from '../components/ui/Bubbles';

// import { httpLink } from '../utils';

// import { Reservations, Events, Cart } from '../components/'

// import dayjs from 'dayjs';
// import { ADD_REGISTRATION } from '../utils/mutations';


const Dashboard = () => {
  return (
    <div>
        <MyEventList />
        {/* <AddEvent /> */}
    </div>
  );
};

export default Dashboard;


/*
const Login = () => {
  const [formData, setFormdata] = useState({
    emailAddress: '',
    password: '',
    loading: false,
    submitError: '',
  });

  const [login] = useMutation(LOGIN);

  const handleChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setFormData needs all of these to be defined to not throw an error.
      setFormdata({ 
        loading: true,
        submitError: formData.submitError,
        emailAddress: formData.emailAddress,
        password: formData.password
      });
      const mutationResponse = await login({
        variables: {
          emailAddress: formData.emailAddress,
          password: formData.password,
        },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (err) {
      // setFormData needs all of these to be defined to not throw an error.
      setFormdata({
        loading: false, 
        submitError: err.message,
        emailAddress: '',
        password: '',
      });
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
              Login
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="emailAddress"
                  className="mb-2 block text-sm font-medium text-gray-900">
                  EMAIL
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
                  PASSWORD
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
                  {formData.loading ? <Bubbles text="Logging In" /> : 'Log In'}
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

// export default Login;


// import { Elements } from '@stripe/react-stripe-js';
// imp/me ort { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe(
//   'pk_test_51NsbiVI8fwprByGXBlusUK1tdXtpnvnrHTggpoweDmVgEAigbLMOhupqLWZgVv4IEjICMyfRBDKJv2OSc2DCcBSH003DL7HRgO',
// );

const EventList = () => {
  let profile;
  if (Auth.loggedIn()) {
    profile = Auth.getProfile();
  }
  const query_info = useQuery(QUERY_EVENTS);
  const [state, dispatch] = useStoreContext();
  const [register, mutation_info] = useMutation(ADD_REGISTRATION);
  const { data, loading, error } = mutation_info;

  const registerForEvent = async (eventId) => {
    // calling this throws an ApolloError, is this cacheing at work?
    if (profile.data) {
      console.log(profile);
      const data = profile.data;
      if (data._id) {
        const userId = data._id;
        try {
          const mutationResponse = await register({
            variables: { eventId, userId },
          });
          // console.log(mutationResponse);
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  const handleStripeCheckout = () => {
    // Redirects the user to the Stripe Checkout page
    window.location.href = 'https://buy.stripe.com/test_14k6oo8KK5ER8bS3cd';
  };

  // Handles the checkout process
  const handleCheckout = async (eventId, cost) => {
    // Create a new Stripe session on the server
    const { data } = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventId,
        cost: 75.00
      }),
    }).then((res) => res.json());

    // Redirect the user to the Stripe checkout page
    // const stripe = await stripePromise;
    // const { error } = await stripe.redirectToCheckout({
    //   sessionId: data.sessionId,
    // });

    // Handle any errors that occur during the redirect.
    if (error) {
      console.error(error);
    }
  };

  if (query_info.loading) return 'Loading...';
  if (query_info.error) return `Error! ${query_info.error.message}`;

  //   const { currentEvent } = state;
  //   console.log(data.events[0]);
  console.log(state);

  const strToDayJS = (unixEpochStr) => dayjs(new Date(Number(unixEpochStr)));
  console.log(query_info.data);
  const events = query_info.data.events.map((event) => {
    // registrations must be submitted before event.dateCutoff
    const expiry =
      strToDayJS(event.dateStart) > dayjs(Date.now())
        ? 'FUTURE'
        : strToDayJS(event.dateEnd) > dayjs(Date.now())
        ? 'CURRENT'
        : strToDayJS(event.dateCutoff) < dayjs(Date.now())
        ? 'OVERDUE'
        : 'EXPIRED';
    const costStr = String(event.feeRegistration + event.feeVenue);
    const cost = ['$', costStr.slice(0, -2), '.', costStr.slice(2)];
    if (['OVERDUE', 'EXPIRED'].includes(expiry)) {
      // omit expired events
      // TODO: (luxury) do this in the SERVER side, so we are transmitting less info, and potentially even QUERYING less info.
      // returning this instead of <></> because
      return <div key={event._id}></div>;
    } else
      return (
        <div
          key={event._id}
          className="mx-10 mb-16 max-w-lg flex-1 rounded-xl bg-white p-6 shadow-xl">
          <h5 className="mb-4 text-xl font-bold leading-tight text-zinc-900">
            {event.name}
          </h5>
          <p className="text-base leading-loose text-zinc-800">
            <strong>HOST:</strong> {event.organizerUserId.nameFirst}{' '}
            {event.organizerUserId.nameLast}
            <br />
            <strong>DATE:</strong>{' '}
            {strToDayJS(event.dateStart).format('MM/DD/YYYY [@] h:mma')} -{' '}
            {strToDayJS(event.dateEnd).format('MM/DD/YYYY [@] h:mma')}
            <br />
            <strong>REGISTERED:</strong> {event.registrations.length}
          </p>
          {/ * <div>
            <div
              key={event._id}
              className="event-card">
              <h3>{event.name}</h3>
              <button onClick={handleStripeCheckout}>Pay Now</button>
            </div>
          </div> * /}

          {expiry === 'FUTURE' ? (
            // <Elements stripe={stripePromise}>
              <Button
                value={event._id}
                margin="mt-4"
                width="w-full"
                padding="py-2"
                onClick={(e) => {
                  handleCheckout(event._id, cost);
                  console.log(event);
                }}>
                Register {cost}
              </Button>
            // </Elements>
          ) : (
            <Button
              value={event._id}
              margin="mt-4"
              width="w-full"
              padding="py-2"
              bgColor="bg-zinc-900/50"
              disabled={true}
              animations={false}>
              Event Expired
            </Button>
          )}
        </div>
      );
  });

  return (
    <div className="mt-16 flex flex-wrap items-center justify-center">
      {events}
    </div>
  );
};

export default EventList;
*/