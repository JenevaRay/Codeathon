import { useState } from 'react';
import { useMutation } from '@apollo/client';

import Auth from '../utils/Auth';
import { ADD_EVENT, ADD_VENUE } from '../utils/mutations';

import Button from './ui/Button';

const NewEventForm = ({ unpaidRegistrationsById }) => {
  const [registerEvent, event_mutation_info] = useMutation(ADD_EVENT);
  const [registerVenue, venue_mutation_info] = useMutation(ADD_VENUE);
  const profile = Auth.loggedIn() ? Auth.getProfile() : undefined;
  let venueId
  let totalCost = 0;
  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  // const [submitError, setSubmitError] = useState('');
  const [newEventMode, setNewEventMode] = useState('');
  const [eventState, setEventState] = useState({
    name: '',
    dateStart: '',
    timeStart: '',
    dateEnd: '',
    timeEnd: '',
    dateCutoff: '',
    registrationPaymentRequiredDate: '',
    feeRegistration: '',
    feeVenue: '',
  });
  const [venueState, setVenueState] = useState({
    name: '',
    addressStreet: '',
    addressExtended: '',
    addressCity: '',
    addressState: '',
    addressPostalCode: '',
    addressCountry: '',
    phoneNumber: '',
    website: '',
  });

  const handleEventFormSubmit = async (e) => {
    e.preventDefault();
    console.log(profile.data._id)
    // validate things here...  right now everything in the event is required.  if everything validates, then submit and change the form mode.
    const event = {
      ...eventState,
      // dateStart: Math.floor(new Date(eventState.dateStart + "T" + eventState.timeStart).getTime() / 1000), // this returns Unix Timestamp, used internally in our code.
      dateStart: String(Math.floor(new Date(eventState.dateStart + 'T' + eventState.timeStart).getTime())),
      dateEnd: String(Math.floor(new Date(eventState.dateEnd + 'T' + eventState.timeEnd).getTime())),
      dateCutoff: String(Math.floor(new Date(eventState.dateCutoff + 'T23:59').getTime())),
      feeRegistration: Number(eventState.feeRegistration),
      feeVenue: Number(eventState.feeVenue),
      organizerUserId: profile.data._id,
      venues: [venueId]
    };
    try {
      registerEvent({variables: event})
      setNewEventMode('');
      window.location.redirect('/checkout')
    } catch (e) {
      console.log(e)
    }
  };
  const handleVenueFormSubmit = async (e) => {
    e.preventDefault();
    const venue = {
      ...venueState
    }
    const newVenue = await registerVenue({variables: venue})
    try {
      const { data } = newVenue
      const { addVenue } = data
      venueId = addVenue._id
      console.log(venueId)
      setNewEventMode('EVENT');
    } catch (e) {
      console.log(e)
    }
    // validate things here...  right now everything in the venue is optional.  if everything validates, then change the form mode.
    
  };
  
  const handleEventChange = (event) => {
    const { name, value } = event.target;
    setEventState({
      ...eventState,
      [name]: value,
    });
  };
  const handleVenueChange = (event) => {
    const { name, value } = event.target;
    setVenueState({
      ...venueState,
      [name]: value,
    });
  };
  // FIRST we display a form for the venue info
  // THEN we display a form for the event info
  totalCost = Object.values(unpaidRegistrationsById).reduce((a, b) => a + b, 0);
  return (
    <div className="mx-10 mb-16 max-w-lg rounded-xl p-6">
      {newEventMode === '' ? (
        <h5 className="mb-4 text-xl font-bold leading-tight text-zinc-900">
          <Button
            margin="mt-4"
            width="w-full"
            padding="py-2"
            onClick={() => {
              window.location.assign('/checkout');
            }}>
            Pay All Reservations{' '}
            {USDollar.format(totalCost/100)}
          </Button>

          <Button
            margin="mt-4"
            width="w-full"
            padding="py-2"
            onClick={() => {
              setNewEventMode('VENUE');
            }}>
            New Event
          </Button>
        </h5>
      ) : (
        ''
      )}
      {newEventMode === 'VENUE' ? (
        <div className="w-full p-6 max-w-lg rounded-xl bg-white shadow-xl dark:border dark:border-gray-700 dark:bg-gray-800 md:mt-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Address Information
            </h1>
          </div>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={handleVenueFormSubmit}>
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Name
              </label>
              <input
              required
                type="text"
                name="name"
                value={venueState.name}
                onChange={handleVenueChange}
                className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                placeholder="Venue Name"
              />
            </div>
            <div>
              <label
                htmlFor="addressStreet"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Address
              </label>
              <input
                type="text"
                name="addressStreet"
                value={venueState.addressStreet}
                onChange={handleVenueChange}
                className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                placeholder="Address"
              />
              <input
                type="text"
                name="addressExtended"
                value={venueState.addressExtended}
                onChange={handleVenueChange}
                className="focus:border-purple mt-4 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                placeholder="Address"
              />
            </div>
            <div>
              <label
                htmlFor="addressCity"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              </label>
              <input
                type="text"
                name="addressCity"
                value={venueState.addressCity}
                onChange={handleVenueChange}
                className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                placeholder="City"
              />
            </div>
            <div>
              <label
                htmlFor="addressState"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                State
              </label>
              <input
                type="text"
                name="addressState"
                value={venueState.addressState}
                onChange={handleVenueChange}
                className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                placeholder="State"
              />
            </div>
            <div>
              <label
                htmlFor="addressCountry"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Country
              </label>
              <input
                type="text"
                name="addressCountry"
                value={venueState.addressCountry}
                onChange={handleVenueChange}
                className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                placeholder="Country"
              />
            </div>
            <div>
              <label
                htmlFor="addressPostalCode"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Postal Code
              </label>
              <input
                type="text"
                name="addressPostalCode"
                value={venueState.addressPostalCode}
                onChange={handleVenueChange}
                className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                placeholder="Postal Code"
              />
            </div>
            <Button
              type="submit"
              width="w-full"
              borderRadius="rounded-md">
              Confirm Address
            </Button>
          </form>
        </div>
      ) : (
        ''
      )}
      {newEventMode === 'EVENT' ? (
        <div className="w-full p-6 max-w-lg rounded-xl bg-white shadow-xl dark:border dark:border-gray-700 dark:bg-gray-800 md:mt-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Event Information
            </h1>
          </div>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={handleEventFormSubmit}>
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Name
              </label>
              <input
                required
                type="text"
                name="name"
                value={eventState.name}
                onChange={handleEventChange}
                className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                placeholder="Event Name"
              />
            </div>
            <div>
              <label
                htmlFor="dateStart"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Time & Date
              </label>
              <input
                required
                type="time"
                name="timeStart"
                value={venueState.timeStart}
                onChange={handleEventChange}
                className="focus:border-purple mb-4 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                placeholder="Starting Time"
              />
              <input
                required
                type="date"
                name="dateStart"
                value={venueState.dateStart}
                onChange={handleEventChange}
                className="focus:border-purple mb-4 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                placeholder="Starting Date"
              />
              <input
                required
                type="time"
                name="timeEnd"
                value={venueState.timeEnd}
                onChange={handleEventChange}
                className="focus:border-purple mb-4 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                placeholder="Starting Time"
              />
              <input
                required
                type="date"
                name="dateEnd"
                value={venueState.dateEnd}
                onChange={handleEventChange}
                className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                placeholder="Ending Date"
              />
            </div>
            <div>
              <label
                htmlFor="dateCutoff"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Register Before
              </label>
              <input
                required
                type="date"
                name="dateCutoff"
                value={venueState.dateCutoff}
                onChange={handleEventChange}
                className="focus:border-purple mb-4 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                placeholder="Register before"
              />
              <label
                htmlFor="registrationPaymentRequiredDate"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Payment Required Before
              </label>
              <input
                required
                type="date"
                name="registrationPaymentRequiredDate"
                value={venueState.registrationPaymentRequiredDate}
                onChange={handleEventChange}
                className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                placeholder="Pay for Registration before..."
              />
            </div>
            <div>
              <label
                htmlFor="feeRegistration"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Fees
              </label>
              <input
                required
                type="number"
                name="feeRegistration"
                value={venueState.feeRegistration}
                onChange={handleEventChange}
                className="focus:border-purple mb-4 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                placeholder="Event Fee, in pennies"
              />
              <input
                required
                type="number"
                name="feeVenue"
                value={venueState.feeVenue}
                onChange={handleEventChange}
                className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                placeholder="Venue Fee, in pennies"
              />
            </div>
            <Button
              type="submit"
              width="w-full"
              borderRadius="rounded-md">
              Confirm New Event
            </Button>
          </form>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default NewEventForm;
