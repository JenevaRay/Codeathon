import { useMutation, useQuery } from '@apollo/client';
import dayjs from 'dayjs';

import { ADD_REGISTRATION } from '../utils/mutations';
import { QUERY_EVENTS } from '../utils/queries';
import Auth from '../utils/Auth';
import { useStoreContext, StoreProvider } from '../utils/GlobalState';

import NewEventForm from '../components/NewEventForm';
import Button from '../components/ui/Button';

const strToDayJS = function (unixEpochStr) {
  return dayjs(new Date(Number(unixEpochStr)));
};

let unpaidRegistrationsById = {};

const Dashboard = () => {
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
  console.log(query_info.data.events)
  const events = query_info.data.events.map((event) => {
    // console.log(event)
    // registrations must be submitted before event.dateCutoff
    // console.log(event.organizerUserId._id)
    
    const isOrganizer = (event.organizerUserId._id === profile.data._id)
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
    let registrations = '';
    if (expiry === 'FUTURE') {
      registrations = event.registrations.map((registration) => {
        const button = '';
        switch (registration.role) {
          case 'host':
            return <Button key={registration._id} disabled={true}>HOST</Button>;
          case 'attendee':
            if (expiry === 'FUTURE') {
              unpaidRegistrationsById[registration._id] =
                event.feeRegistration + event.feeVenue;
            }
            return (
              <Button
              padding="px-6 py-3"
              bgColor="bg-cyan-600/80"
              width='w-full'
              disabled={true}
              animations={false}
                key={registration._id}
                onClick={() => {
                  window.location.assign('/checkout');
                }}>
                Not Yet Confirmed {cost}
              </Button>
            );
          default:
            // console.log(registration.role);
            break
        }
        return button;
      });
    }
    return (
      <div
        key={event._id}
        className="mx-10 mb-16 max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <h5 className="mb-4 text-xl font-bold leading-tight text-zinc-900">
          {event.name}
        </h5>
        <p className="text-base leading-loose text-zinc-800">
          {isOrganizer ? (
            'YOU ARE HOST'
          ) : (
            <>
              <strong>HOST:</strong>
              {event.organizerUserId.nameFirst} {event.organizerUserId.nameLast}
            </>
          )}
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
              register({variables: {eventId: event._id, userId: profile.data._id}});
              window.location.assign('/checkout');
            }}>
            Register to Attend for {cost}
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
            No New Registrations
          </Button>
        )}
        {/* Future: the Manage button should allow edits to the Event posting. */}
        {/* Future: the Volunteer button should allow someone to confirm for $0. */}
        {registrations.length > 0 ? (
          <>
            <br />
            <h4 className='my-3'>Registrations</h4>
          </>
        ) : (
          ''
        )}
        {registrations}
      </div>
    );
  });
  return (
    <StoreProvider value={[state, dispatch]}>
      <div className="mt-16 flex flex-wrap items-center justify-center">
        {events}
        <NewEventForm unpaidRegistrationsById={unpaidRegistrationsById} />
      </div>
    </StoreProvider>
  );
};

export default Dashboard;
