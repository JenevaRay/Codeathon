import { useReducer, useState } from 'react'
import dayjs from 'dayjs';
import { ADD_REGISTRATION_TO_CART } from '../utils/actions';
import { ADD_REGISTRATION } from '../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';
import { useStoreContext, QUERY_EVENTS, Auth, StoreProvider } from '../utils/';

import Button from './ui/Button';

import { useEffect } from 'react';

const strToDayJS = function (unixEpochStr) {
  return dayjs(new Date(Number(unixEpochStr)));
};

const NewEventForm = () => {
  const [submitError, setSubmitError] = useState('')
  const [newEventMode, setNewEventMode] = useState('')
  const [eventState, setEventState] = useState({
    name: '', 
    dateStart: '', 
    dateEnd: '', 
    dateCutoff: '',
    registrationPaymentRequiredDate: '',
    feeRegistration: '',
    feeVenue: ''
  })
  const [venueState, setVenueState] = useState({
    name: '',
    addressStreet: '',
    addressExtended: '',
    addressCity: '',
    addressState: '',
    addressPostalCode: '',
    addressCountry: '',
    phoneNumber: '',
    website: ''
  })
  
  const handleEventFormSubmit = async (e) => {
    e.preventDefault();
    // validate things here...  right now everything in the event is required.  if everything validates, then submit and change the form mode.
    console.log(eventState)
    console.log(venueState)
    setNewEventMode('')
  }
  const handleVenueFormSubmit = async (e) => {
    e.preventDefault();
    // validate things here...  right now everything in the venue is optional.  if everything validates, then change the form mode.
    setNewEventMode('EVENT')
  }
  const handleEventChange = (event) => {
    const { name, value } = event.target;
    setEventState({
      ...eventState,
      [name]: value
    })
  }
  const handleVenueChange = (event) => {
    const { name, value } = event.target;
    setVenueState({
        ...venueState,
        [name]: value
    })
  }
  // console.log(venueState)
// FIRST we display a form for the venue info
// THEN we display a form for the event info
  return (
  <div
    className="mx-10 mb-16 max-w-lg flex-1 rounded-xl bg-white p-6 shadow-xl">
    {newEventMode === '' ? (<h5 className="mb-4 text-xl font-bold leading-tight text-zinc-900">
      <Button 
        margin="mt-4"
        width="w-full"
        padding="py-2"
        onClick={()=>{setNewEventMode('VENUE')}}
      >New Event</Button>
    </h5>) : ''}
    {newEventMode === 'VENUE' ? 
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
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input type="text" name="name" value={venueState.name} onChange={handleVenueChange} className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
              placeholder="Venue Name" />
          </div>
          <div>
            <label htmlFor="addressStreet" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Address</label>
            <input type="text" name="addressStreet" value={venueState.addressStreet} onChange={handleVenueChange} className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
              placeholder="Address" />
            <input type="text" name="addressExtended" value={venueState.addressExtended} onChange={handleVenueChange} className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
              placeholder="Address" />
          </div>
          <div>
            <label htmlFor="addressCity" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">City</label>
            <input type="text" name="addressCity" value={venueState.addressCity} onChange={handleVenueChange} className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
              placeholder="City" />
          </div>
          <div>
            <label htmlFor="addressState" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">State</label>
            <input type="text" name="addressState" value={venueState.addressState} onChange={handleVenueChange} className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
              placeholder="State" />
          </div>
          <div>
            <label htmlFor="addressCountry" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Country</label>
            <input type="text" name="addressCountry" value={venueState.addressCountry} onChange={handleVenueChange} className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
              placeholder="Country" />
          </div>
          <div>
            <label htmlFor="addressPostalCode" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Postal Code</label>
            <input type="text" name="addressPostalCode" value={venueState.addressPostalCode} onChange={handleVenueChange} className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
              placeholder="Postal Code" />
          </div>
            <Button
                 type="submit"
                 width="w-full"
                 borderRadius="rounded-md"
                 >
                 Confirm Address
               </Button>

        </form>
      </div> : ''
    }
    {newEventMode === 'EVENT' ? 
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
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input required type="text" name="name" value={eventState.name} onChange={handleEventChange} className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
              placeholder="Event Name" />
          </div>
          <div>
            <label htmlFor="dateStart" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Time & Date</label>
            <input required type="date" name="dateStart" value={venueState.dateStart} onChange={handleEventChange} className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
              placeholder="Starting Date" />
            <input required type="date" name="dateEnd" value={venueState.dateEnd} onChange={handleEventChange} className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
              placeholder="Ending Date" />
          </div>
          <div>
            <label htmlFor="dateCutoff" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Register Before</label>
            <input required type="date" name="dateCutoff" value={venueState.dateCutoff} onChange={handleEventChange} className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
              placeholder="Register before" />
            <label htmlFor="registrationPaymentRequiredDate" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Payment Required Before</label>
            <input required type="date" name="registrationPaymentRequiredDate" value={venueState.registrationPaymentRequiredDate} onChange={handleEventChange} className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
              placeholder="Pay for Registration before" />
          </div>
          <div>
            <label htmlFor="feeRegistration" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Fees</label>
            <input required type="number" name="feeRegistration" value={venueState.feeRegistration} onChange={handleEventChange} className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
              placeholder="Event Fee, in pennies" />
            <input required type="number" name="feeVenue" value={venueState.feeVenue} onChange={handleEventChange} className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
              placeholder="Venue Fee, in pennies" />
          </div>
            <Button
              type="submit"
              width="w-full"
              borderRadius="rounded-md"
              >
              Confirm New Event
            </Button>
        </form>
      </div> : ''
    }

  </div>
)
}

const MyEventList = () => {
  const profile = Auth.loggedIn() ? Auth.getProfile() : undefined
  const query_info = useQuery(QUERY_EVENTS);
  const [state, dispatch] = useStoreContext();
  const [register, mutation_info] = useMutation(ADD_REGISTRATION);
  const { /* data, loading,*/ error } = mutation_info;
  if (!profile) {
    return 'Not Logged In'
  }
  // console.log(state)


  // const handleStripeCheckout = () => {
  //   // Redirects the user to the Stripe Checkout page
  //   window.location.href = 'https://buy.stripe.com/test_14k6oo8KK5ER8bS3cd';
  // };

  // Handles the checkout process

  if (query_info.loading) return 'Loading...';
  if (query_info.error) return `Error! ${query_info.error.message}`;

  //   const { currentEvent } = state;
  //   console.log(data.events[0]);

  const strToDayJS = (unixEpochStr) => dayjs(new Date(Number(unixEpochStr)));
  const myUnpaidReservations = []
  const events = query_info.data.events.map((event) => {
    // registrations must be submitted before event.dateCutoff
    // console.log(event)
    const isOrganizer = event.organizerUserId._id === profile.data._id
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
      const button = ''
      switch (registration.role) {
        case 'host':
          return <Button disabled={true} >HOST</Button>
        case 'attendee':
          return (<Button >{'Confirm ' + cost.join('')}</Button>)
        default:
          console.log(registration.role)
      }
      return button
      // return (<Button>{registration.paid ? (registration.role === 'host' ? 'HOST' : ''): 'Confirm ' + cost.join('')}</Button>)
    })
    // if (['OVERDUE', 'EXPIRED'].includes(expiry)) {
    //   // omit expired events
    //   // TODO: (luxury) do this in the SERVER side, so we are transmitting less info, and potentially even QUERYING less info.
    //   // returning this instead of <></> because
    //   return <div key={event._id}></div>;
    // } else
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
            {/* <div>
              <div
                key={event._id}
                className="event-card">
                <h3>{event.name}</h3>
                <button onClick={handleStripeCheckout}>Pay Now</button>
              </div>
            </div> */}

            {expiry === 'FUTURE' ? (
              // <Elements stripe={stripePromise}>
                <Button
                  value={event._id}
                  margin="mt-4"
                  width="w-full"
                  padding="py-2"
                  onClick={(e) => {
                    
                    // registerForEvent(event._id)
                    
                  }}>
                  Attend {cost}
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
            <p>&nbsp;</p>
            {/* Future: the Manage button should allow edits to the Event posting. */}
            {/* Future: the Volunteer button should allow someone to confirm for $0. */}
            {isOrganizer? <Button>Manage</Button> : <Button>Volunteer</Button>}
            
            {reservations.length > 0 ? 
            <>
              <br />
              <h4>Reservations</h4>
            </> : ''}
            {reservations}
          </div>
          
      );
  });

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





//     // const [addUser] = useMutation(ADD_USER)
//     // const [addAddress] = useMutation(ADD_ADDRESS)
//     // const [addPhone] = useMutation(ADD_PHONE)

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();
//         console.log(formState)
//         // const mutationResponse = await addUser({
//         //     variables: {
//         //         nameFirst: formState.nameFirst,
//         //         nameLast: formState.nameLast,
//         //         email: formState.email,
//         //         emailType: formState.emailType,
//         //         otherContactMethod: formState.otherContactMethod,
//         //         preferredContactMethod: formState.preferredContactMethod,
//         //         password: formState.password
//         //     }
//         // })
//         // const token = mutationResponse.data.addUser.token
//         // Auth.login(token)
//     }

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormState({
//         ...formState,
//         [name]: value
//     })
//   }
//   return (
//     <div className="relative h-full w-full overflow-hidden">
//       <div className="relative z-50 mx-auto flex min-h-screen flex-col items-center justify-center px-6 py-8 lg:py-0">
//         <div className="flex flex-col items-center justify-center">
//           <a
//             href="/"
//             className="my-12 text-2xl font-extrabold leading-tight text-zinc-900">
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
//               onSubmit={handleFormSubmit}>
//               <div>
//                 <label htmlFor="nameFirst" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">First Name</label>
//                 <input type="text" name="nameFirst" value={formState.nameFirst} onChange={handleChange} className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
//                   placeholder="First Name" />
//               </div>
//               <div>
//                 <label htmlFor="nameLast" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
//                 <input type="text" name="nameLast" value={formState.nameLast} onChange={handleChange} className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
//                   placeholder="Last Name" />
//               </div>
              // { We can change emailType to a drowdown. }
              // <div>
              //   <label htmlFor="emailType" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Email Type</label>
              //   <input type="text" name="emailType" value={formState.emailType} onChange={handleChange} className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
              //     placeholder="Email Type" />
              // </div>
              // <div>
              //   <label htmlFor="preferredContactMethod" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Preferred Contact Method</label>
              //   <input type="text" name="preferredContactMethod" value={formState.preferredContactMethod} onChange={handleChange} className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
              //     placeholder="Preferred Contact Method" />
              // </div>
              // <div>
              //   <label htmlFor="otherContactMethod" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Other Contact Method</label>
              //   <input type="text" name="otherContactMethod" value={formState.otherContactMethod} onChange={handleChange} className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
              //     placeholder="Other Contact Method" />
              // </div>
              // <div>
              //   <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Phone #</label>
              //   <input type="text" name="phone" value={formState.phone} onChange={handleChange} className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
              //     placeholder="Phone #" />
              // </div>
              // <div>
              //   <div>
              //       <label htmlFor="streetAddress" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Address</label>
              //       <input type="text" name="streetAddress" value={formState.streetAddress} onChange={handleChange} className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
              //       placeholder="Street Address" />
              //       <input type="text" name="extendedAddress" value={formState.streetAddress} onChange={handleChange} className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
              //       placeholder="Extended Address" />
              //   </div>
              //   <div>
              //       <label htmlFor="country" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Country</label>
              //       <input type="text" name="country" value={formState.country} onChange={handleChange} className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
              //       placeholder="Country" />
              //   </div>
              //   <div>
              //       <label htmlFor="state" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">State</label>
              //       <input type="text" name="state" value={formState.state} onChange={handleChange} className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
              //       placeholder="State" />
              //   </div>
              //   <div>
              //       <label htmlFor="county" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">County</label>
              //       <input type="text" name="county" value={formState.county} onChange={handleChange} className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
              //       placeholder="County" />
              //   </div>
              //   <div>
              //       <label htmlFor="city" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">City</label>
              //       <input type="text" name="city" value={formState.city} onChange={handleChange} className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
              //       placeholder="City" />
              //   </div>
              //   <div>
              //       <label htmlFor="postalCode" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Postal Code</label>
              //       <input type="text" name="postalCode" value={formState.postalCode} onChange={handleChange} className="focus:border-purple m-0 w-full rounded-xl border border-solid border-zinc-300 bg-zinc-50 bg-clip-padding px-4 py-4 text-base font-normal text-zinc-700 transition ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
              //       placeholder="Postal Code" />
              //   </div>
              // </div>
              // <div>
              //   <label
              //     htmlFor="email"
              //     className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              //     EMAIL
              //   </label>
              //   <input
              //     type="email"
              //     name="email"
              //     value={formState.email}
              //     onChange={handleChange}
              //     className="focus:border-purple
              //   m-0
              //   w-full
              //   rounded-xl border
              //   border-solid border-zinc-300 bg-zinc-50
              //   bg-clip-padding px-4 py-4 text-base
              //   font-normal
              //   text-zinc-700
              //   transition
              //     ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
              //     placeholder="email@example.com"
              //   />
              // </div>
              // <div>
              //   <label
              //     htmlFor="password"
              //     className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              //     PASSWORD
              //   </label>
              //   <input
              //     type="password"
              //     name="password"
              //     placeholder="••••••••"
              //     value={formState.password}
              //     onChange={handleChange}
              //     className="focus:border-purple
              //   m-0
              //   w-full
              //   rounded-xl border
              //   border-solid border-zinc-300 bg-zinc-50
              //   bg-clip-padding px-4 py-4 text-base
              //   font-normal
              //   text-zinc-700
              //   transition
              //     ease-in-out focus:outline-none dark:border-zinc-500 dark:bg-slate-800 dark:text-zinc-200"
              //   />
              // </div>
              // <div className="flex items-center justify-between">
              //   <div className="flex items-start">
              //     <div className="flex h-5 items-center">
              //       <input
              //         aria-describedby="remember"
              //         type="checkbox"
              //         className="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
              //       />
              //     </div>
              //     <div className="ml-3 text-sm">
              //       <label
              //         htmlFor="remember"
              //         className="text-gray-500 dark:text-gray-300">
              //         Remember me
              //       </label>
              //     </div>
              //   </div>
              //   <a
              //     href="/"
              //     className="text-sm font-medium text-gray-700 hover:underline">
              //     Forgot Password?
              //   </a>
              // </div>
//               <Button
//                 type="submit"
//                 width="w-full"
//                 borderRadius="rounded-md"
//                 // disabled={loading}
//                 >
//                 Log in
//               </Button>}
//               <button
//                 type="submit"
//                 className="bg-purple hover:bg-purpleDark w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white hover:shadow-lg focus:outline-none"
//                 // disabled={loading}>
//                 >
//                 Sign in
//               </button>
//               {submitError && <p>{submitError}</p>}
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

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

// export default Signup;


