import { useQuery } from '@apollo/client';
import dayjs from 'dayjs';

import Auth from '../utils/Auth'

import { QUERY_REGISTRATIONS } from '../utils/queries';

import Button from './ui/Button';

const strToDayJS = (unixEpochStr) => dayjs(new Date(Number(unixEpochStr)));

function RegistrationList() {
  const profile = Auth.loggedIn() ? Auth.getProfile() : undefined;
  const { loading, error, data } = useQuery(QUERY_REGISTRATIONS);
  // const [state, dispatch] = useStoreContext();
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  // const { currentEvent } = state;

  const registrations = data.registrations
    .filter((registration) => registration.userId._id === profile.data._id)
    .map((registration) => (
      <div
        key={registration._id}
        className="mx-10 mb-16 max-w-lg flex-1 rounded-xl bg-white p-6 shadow-xl">
        <p className="text-base leading-loose text-zinc-800">
          Event starts at{' '}
          {strToDayJS(registration.eventId.dateStart).format(
            'MM/DD/YYYY [@] h:mma',
          )}
        </p>
        <p className="text-base leading-loose text-zinc-800">
          Event ends at{' '}
          {strToDayJS(registration.eventId.dateEnd).format(
            'MM/DD/YYYY [@] h:mma',
          )}
        </p>
        {/* <p>This registration is {registration.paid ? 'paid' : 'not paid'}</p> */}
        {registration.paid ? (
          <Button
            value={registration._id}
            margin="mt-4"
            width="w-full"
            padding="py-2">
            {registration.role === 'host' ? 'HOSTING' : 'PAID'}
          </Button>
        ) : (
          <Button
            value={registration._id}
            margin="mt-4"
            width="w-full"
            padding="py-2">
            PAY{' '}
            {[
              '$',
              String(
                registration.eventId.feeRegistration +
                  registration.eventId.feeVenue,
              ).slice(0, -2),
              '.',
              String(
                registration.eventId.feeRegistration +
                  registration.eventId.feeVenue,
              ).slice(2),
            ]}{' '}
            as {registration.role === 'attendee' ? 'an ' : ''}
            {registration.role.toUpperCase()}
          </Button>
        )}
        {/* <p>You are {registration.role} for this event.</p> */}
      </div>
    ));
  return (
    <div className="mt-16 flex flex-wrap items-center justify-center">
      {registrations}
    </div>
  );
}

export default RegistrationList;
