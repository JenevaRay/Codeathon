import { useState } from 'react';
import dayjs from 'dayjs';
import { useQuery } from '@apollo/client';
import {
  CardElement,
  useStripe,
  useElements,
  AddressElement,
} from '@stripe/react-stripe-js';

import { QUERY_REGISTRATIONS } from '../utils/queries';
import { remoteServer, selfServer } from '../config/remote'

import { useStoreContext } from '../utils/GlobalState';
// import { States } from '../utils/constants';
import Auth from '../utils/Auth';

import Button from '../components/ui/Button';
import StatusMessages, { useMessages } from '../payment/StatusMessages';

const Checkout = () => {
  const [checked, setChecked] = useState(false);
  const [state] = useStoreContext(); // dispatch when we need it can be added to this array.
  const strToDayJS = (unixEpochStr) => dayjs(new Date(Number(unixEpochStr)));
  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });  
  let registrationIds = {};
  const profile = Auth.loggedIn() ? Auth.getProfile() : undefined;
  let itemizedTotal = 0;
  let eventNames = [];
  // original code rendered by itemizedTotal = ['$',String(itemizedTotal).slice(0, -2),'.',String(itemizedTotal).slice(-2),]
  const query_info = useQuery(QUERY_REGISTRATIONS);

  const stripe = useStripe();
  const elements = useElements();
  const [messages, addMessage] = useMessages();

  const formatReservations = () => {
    if (
      state &&
      state.registrations &&
      !state.registrations.length &&
      profile &&
      profile.data &&
      profile.data._id
    ) {
      // for when the client falls out of sync with the server...  (because empty registrations) and the user is logged in.
      // TODO: which is, right now, all the time...
      const { loading, data } = query_info;
      // console.log(data)
      if (!loading && data) {
        const registrations = data.registrations
          .filter((registration) => !registration.paid)
          // .filter (by date)
          .map((registration) => {
            eventNames.push(registration.eventId.name);
            const costStr = String(
              registration.eventId.feeRegistration +
                registration.eventId.feeVenue,
            );
            const cost = USDollar.format(costStr/100)
            itemizedTotal +=
              registration.eventId.feeRegistration +
              registration.eventId.feeVenue;
            registrationIds[registration._id] = registration.eventId.dateStart;
            return (
              <div
                key={registration._id}
                className="flex flex-col rounded-xl bg-white sm:flex-row">
                <img
                  className="m-2 h-24 w-28 rounded-xl border object-cover object-center"
                  src="/daypass.png"
                  alt=""
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">
                    {registration.eventId.name}
                  </span>
                  <span className="float-right text-zinc-400">
                    {strToDayJS(registration.eventId.dateStart).format(
                      'MM/DD/YYYY [@] h:mma',
                    )}
                  </span>
                  <p className="mt-auto text-lg font-bold">{cost}</p>
                </div>
              </div>
            );
          });
        return registrations;
      } else {
        return '';
      }
    } else {
      console.log('TODO');
      return '';
    }
  };

  const handleChange = () => {
    setChecked(!checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      addMessage('Stripe.js has not yet loaded');
      return;
    }

    const { error: backendError, clientSecret } = await fetch(
      // 'http://192.168.56.102:3001/create-payment-intent',
      remoteServer + '/create-payment-intent',
      {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin':
            // 'http://192.168.56.102:3001',
            selfServer,
            // 'https://codeathon-1b48b4588e47.herokuapp.com',
          'Access-Control-Allow-Headers': '*',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({
          registrationIds: Object.keys(registrationIds),
          paymentMethodType: 'card',
          currency: 'usd',
          amount: itemizedTotal,
          description: eventNames.join(', '),
        }),
      },
    ).then((r) => r.json());

    if (backendError) {
      addMessage(backendError.message);
      return;
    }

    addMessage('Client secret returned');

    const { error: stripeError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'John Jacob Smith',
          },
        },
      });

    if (stripeError) {
      addMessage(stripeError.message);
      return;
    }

    addMessage(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);
  };

  console.log(registrationIds);

  return (
    <>
      <div className="flex flex-row items-center justify-around pb-8 pt-2 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <div className="grid pb-12 sm:px-10 md:grid-cols-2 lg:px-20 lg:pb-0 xl:px-32">
          <div className="px-4 pt-20 lg:px-12">
            <p className="text-xl font-medium">Order Summary</p>
            <p className="text-zinc-400">
              Check your items and select your preferred shipping method
            </p>
            <div className="shadow-px-2 mt-8 space-y-3 rounded-xl bg-white py-4 shadow-xl sm:px-6">
              {formatReservations()}
              <div className="flex flex-col rounded-xl bg-white sm:flex-row">
                <img
                  className="m-2 h-24 w-28 rounded-xl border object-cover object-center"
                  src="/lanyard.jpg"
                  alt=""
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">Codeathon Event Lanyard</span>
                  <span className="float-right text-zinc-400">Green</span>
                  <p className="mt-auto text-lg font-bold">$0.00</p>
                </div>
              </div>
            </div>

            <p className="mt-16 text-lg font-medium lg:mt-8">
              Delivery Methods
            </p>
            <form className="mt-5 grid gap-6">
              <div className="relative">
                <input
                  className="peer hidden"
                  id="radio_1"
                  type="radio"
                  name="radio"
                  checked={checked ? false : true}
                  onChange={handleChange}
                />
                <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-zinc-300 bg-white peer-checked:border-zinc-700"></span>
                <label
                  className="flex cursor-pointer select-none rounded-xl border border-zinc-300 p-4 peer-checked:border-2 peer-checked:border-zinc-700 peer-checked:bg-zinc-50"
                  htmlFor="radio_1">
                  <img
                    className="w-14 object-contain"
                    src="/email.png"
                    alt=""
                  />
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">Email Delivery</span>
                    <p className="text-sm leading-6 text-slate-500">
                      Estimated Time: 1-5 Minutes
                    </p>
                  </div>
                </label>
              </div>
              <div className="relative">
                <input
                  className="peer hidden"
                  id="radio_2"
                  type="radio"
                  name="radio"
                  checked={checked ? true : false}
                  onChange={handleChange}
                />
                <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-zinc-300 bg-white peer-checked:border-zinc-700"></span>
                <label
                  className="flex cursor-pointer select-none rounded-xl border border-zinc-300 p-4 peer-checked:border-2 peer-checked:border-zinc-700 peer-checked:bg-zinc-50"
                  htmlFor="radio_2">
                  <img
                    className="w-14 object-contain"
                    src="/pdf.png"
                    alt=""
                  />
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">Instant Download</span>
                    <p className="text-sm leading-6 text-slate-500">
                      Estimated Time: 1-2 minutes
                    </p>
                  </div>
                </label>
              </div>
              <StatusMessages messages={messages} />
            </form>
          </div>
          <div className="px-4 pt-20">
            <form
              id="payment-form"
              onSubmit={handleSubmit}>
              <p className="text-xl font-medium">Payment Details</p>
              <p className="text-zinc-400">
                Complete your order by providing your payment details
              </p>
              <div className="">
                <label
                  htmlFor="email"
                  className="mb-2 mt-4 block text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="w-full rounded-md border border-zinc-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="email@gmail.com"
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-zinc-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                </div>
                {/* <label
                  htmlFor="card-holder"
                  className="mb-2 mt-4 block text-sm font-medium">
                  Card Holder
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="card-holder"
                    name="card-holder"
                    className="w-full rounded-md border border-zinc-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="Your full name here"
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-zinc-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                      />
                    </svg>
                  </div>
                </div> */}
                <label
                  htmlFor="card-no"
                  className="mb-2 mt-4 block text-sm font-medium">
                  Card
                </label>
                <div className="w-full"></div>
                <div className="flex">
                  <CardElement
                    className="w-full rounded-md border border-zinc-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-purple-500 focus:ring-purple-500"
                    id="card"
                  />
                  {/* <div className="relative w-7/12 flex-shrink-0"> */}
                  {/* <input
                      type="text"
                      id="card-no"
                      name="card-no"
                      className="w-full rounded-md border border-zinc-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-purple-500 focus:ring-purple-500"
                      placeholder="xxxx-xxxx-xxxx-xxxx"
                    /> */}
                  {/* <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <svg
                        className="h-4 w-4 text-zinc-400"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16">
                        <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                        <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                      </svg>
                    </div> */}

                  {/* </div> */}
                  {/* <input
                    type="text"
                    name="credit-expiry"
                    className="w-full rounded-md border border-zinc-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="MM/YY"
                  />
                  <input
                    type="text"
                    name="credit-cvc"
                    className="w-1/6 flex-shrink-0 rounded-md border border-zinc-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="CVC"
                  /> */}
                </div>
                <label
                  htmlFor="billing-address"
                  className="mb-2 mt-4 block text-sm font-medium">
                  Billing Address
                </label>
                <AddressElement options={{ mode: 'billing' }} />
                {/* <div className="flex flex-col sm:flex-row"> */}
                {/* <div className="relative flex-shrink-0 sm:w-7/12"> */}
                {/* <input
                      type="text"
                      id="billing-address"
                      name="billing-address"
                      className="w-full rounded-md border border-zinc-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-purple-500 focus:ring-purple-500"
                      placeholder="Street Address"
                    /> */}
                {/* <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <img
                        className="h-4 w-4 object-contain"
                        src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg"
                        alt=""
                      />
                    </div> */}
                {/* </div> */}
                {/* <select
                    type="text"
                    name="billing-state"
                    className="w-full rounded-md border border-zinc-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-purple-500 focus:ring-purple-500">
                    {States.map((state) => {
                      return (
                        <option
                          key={state.replace(' ', '')}
                          value="State">
                          {state}
                        </option>
                      );
                    })}
                  </select> */}
                {/* <input
                    type="text"
                    name="billing-zip"
                    className="flex-shrink-0 rounded-md border border-zinc-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-purple-500 focus:ring-purple-500 sm:w-1/6"
                    placeholder="ZIP"
                  /> */}
                {/* </div> */}

                <div className="mt-6 border-b border-t py-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-zinc-900">
                      Subtotal
                    </p>
                    <p className="font-semibold text-zinc-900">
                      {USDollar.format(itemizedTotal / 100)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-zinc-900">
                      Shipping
                    </p>
                    <p className="text-sm font-semibold text-zinc-900">
                      {!checked ? 'Email Delivery' : 'Instant Download'} - $0.00
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium text-zinc-900">Total</p>
                  <p className="font-semibold text-zinc-900">
                    {USDollar.format(itemizedTotal / 100)}
                  </p>
                </div>
              </div>
              <Button
                margin="mt-8"
                padding="px-6 py-3"
                borderRadius="rounded-md"
                bgColor="bg-zinc-900"
                hoverColor="hover:bg-zinc-900/90"
                width="w-full"
                type="submit"
                onSubmit={handleSubmit}>
                Place Order
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
