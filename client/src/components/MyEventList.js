import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import dayjs from 'dayjs';

import { ADD_REGISTRATION } from '../utils/mutations';
import { QUERY_EVENTS } from '../utils/queries';

import Auth from '../utils/Auth';

import { useStoreContext, StoreProvider } from '../utils/GlobalState';

import Button from './ui/Button';

const strToDayJS = function (unixEpochStr) {
  return dayjs(new Date(Number(unixEpochStr)));
};

let totalCost = 0;

const NewEventForm = () => {
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
    // validate things here...  right now everything in the event is required.  if everything validates, then submit and change the form mode.
    const event = {
      ...eventState,
      // dateStart: Math.floor(new Date(eventState.dateStart + "T" + eventState.timeStart).getTime() / 1000), // this returns Unix Timestamp, used internally in our code.
      dateStart: eventState.dateStart + 'T' + eventState.timeStart,
      dateEnd: eventState.dateEnd + 'T' + eventState.timeEnd, // this returns an industry standard date time string.  We can also call Date on this.
    };
    console.log(event);
    setNewEventMode('');
  };
  const handleVenueFormSubmit = async (e) => {
    e.preventDefault();
    // validate things here...  right now everything in the venue is optional.  if everything validates, then change the form mode.
    setNewEventMode('EVENT');
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
  // console.log(venueState)
  // FIRST we display a form for the venue info
  // THEN we display a form for the event info
  return (
    <div className="mx-10 mb-16 max-w-lg flex-1 rounded-xl bg-white p-6 shadow-xl">
      {newEventMode === '' ? (
        <h5 className="mb-4 text-xl font-bold leading-tight text-zinc-900">
          <Button
            margin="mt-4"
            width="w-full"
            padding="py-2"
            onClick={() => {
              setNewEventMode('VENUE');
            }}>
            Pay All Reservations { ['$', String(totalCost).slice(0, -2), '.', String(totalCost).slice(2)]}
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
        <div className="w-full max-w-lg rounded-lg bg-white shadow-xl dark:border dark:border-gray-700 dark:bg-gray-800 md:mt-0 xl:p-0">
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
                className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                placeholder="Address"
              />
            </div>
            <div>
              <label
                htmlFor="addressCity"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                City
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
        <div className="w-full max-w-lg rounded-lg bg-white shadow-xl dark:border dark:border-gray-700 dark:bg-gray-800 md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Address Information
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
                className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                placeholder="Starting Time"
              />
              <input
                required
                type="date"
                name="dateStart"
                value={venueState.dateStart}
                onChange={handleEventChange}
                className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
                placeholder="Starting Date"
              />
              <input
                required
                type="time"
                name="timeEnd"
                value={venueState.timeEnd}
                onChange={handleEventChange}
                className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
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
                className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
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
                className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
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

const MyEventList = () => {
  const profile = Auth.loggedIn() ? Auth.getProfile() : undefined;
  const query_info = useQuery(QUERY_EVENTS);
  const [state, dispatch] = useStoreContext();
  const [register, mutation_info] = useMutation(ADD_REGISTRATION);

  if (!profile) {
    return 'Not Logged In';
  }

  // Handles the checkout process

  if (query_info.loading) return 'Loading...';
  if (query_info.error) return `Error! ${query_info.error.message}`;

  
  const events = query_info.data.events.map((event) => {
    // registrations must be submitted before event.dateCutoff
    const isOrganizer = event.organizerUserId._id === profile.data._id;
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
    const reservations = event.registrations.map((registration) => {
      const button = '';
      switch (registration.role) {
        case 'host':
          return <Button disabled={true}>HOST</Button>;
        case 'attendee':
          if (expiry === 'FUTURE')
          totalCost += event.feeRegistration + event.feeVenue
          return <Button>Not Yet Confirmed</Button>;
        default:
          console.log(registration.role);
      }
      return button;
    });
    console.log(totalCost)
    return (
      <div
        key={event._id}
        className="mx-10 mb-16 max-w-lg flex-1 rounded-xl bg-white p-6 shadow-xl">
        <h5 className="mb-4 text-xl font-bold leading-tight text-zinc-900">
          {event.name}
        </h5>
        <p className="text-base leading-loose text-zinc-800">
          { isOrganizer ? 
             'YOU ARE HOST' : (<><strong>HOST:</strong>{event.organizerUserId.nameFirst}{' '}
             {event.organizerUserId.nameLast}</>)
          }
          <br />
          <strong>DATE:</strong>{' '}
          {strToDayJS(event.dateStart).format('MM/DD/YYYY [@] h:mma')} -{' '}
          {strToDayJS(event.dateEnd).format('MM/DD/YYYY [@] h:mma')}
          <br />
          <strong>REGISTERED:</strong> {event.registrations.length}
        </p>
        {expiry === 'FUTURE' ? (
          <Button
            value={event._id}
            margin="mt-4"
            width="w-full"
            padding="py-2"
            onClick={(e) => {
              register(event._id);
            }}>
            Attend {cost}
          </Button>
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
        <p>&nbsp;</p>
        {/* Future: the Manage button should allow edits to the Event posting. */}
        {/* Future: the Volunteer button should allow someone to confirm for $0. */}
        {isOrganizer ? <Button>Manage</Button> : <Button>Volunteer</Button>}

        {reservations.length > 0 ? (
          <>
            <br />
            <h4>Reservations</h4>
          </>
        ) : (
          ''
        )}
        {reservations}
      </div>
    );
  });
  console.log(totalCost);
  return (
    <StoreProvider value={[state, dispatch]}>
      <div className="mt-16 flex flex-wrap items-center justify-center">
        {events}
        <NewEventForm />
      </div>
    </StoreProvider>
  );
};

export default MyEventList;
