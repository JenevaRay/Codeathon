import dayjs from 'dayjs';
import { ADD_REGISTRATION } from '../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';
import { useStoreContext, QUERY_EVENTS, Auth } from '../utils/';

const containerStyle = {
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
};

const eventItemStyle = {
  backgroundColor: '#f9f9f9',
  padding: '15px',
  marginBottom: '10px',
  borderRadius: '4px',
  boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
  backgroundImage: 'linear-gradient(to right, #800080, #FF69B4)',
  backgroundSize: '100% 100%',
  color: 'white',
};

const buttonStyle = {
  backgroundColor: '#4a90e2',
  color: '#ffffff',
  padding: '8px 16px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

function EventList() {
  const profile = Auth.getProfile();
  const query_info = useQuery(QUERY_EVENTS);
  const [state, dispatch] = useStoreContext();
  const [register, mutation_info] = useMutation(ADD_REGISTRATION);
  const { data, loading, error } = mutation_info;
  
  const registerForEvent = async (eventId) => {
    // calling this throws an ApolloError, is this cacheing at work?
    if (profile.data) {
        console.log(profile)
        const data = profile.data
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

  if (query_info.loading) return 'Loading...';
  if (query_info.error) return `Error! ${query_info.error.message}`;

//   const { currentEvent } = state;
  //   console.log(data.events[0]);
  console.log(state);

  const strToDayJS = function (unixEpochStr) {
    return dayjs(new Date(Number(unixEpochStr)));
  };

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
        <li
          key={event._id}
          style={eventItemStyle}>
          <p>
            <em>{event.name}</em> hosted by {event.organizerUserId.nameFirst}{' '}
            {event.organizerUserId.nameLast}
          </p>
          <p>
            {strToDayJS(event.dateStart).format('MM/DD/YY [at] HH:mm')} - to -{' '}
            {strToDayJS(event.dateEnd).format('MM/DD/YY [at] HH:mm')}
          </p>
          {expiry === 'FUTURE' ? (
            <button
              value={event._id}
              onClick={(e) => {
                registerForEvent(e.target.value);
              }}
              style={buttonStyle}>
              REGISTER {cost}
            </button>
          ) : (
            <></>
          )}
          <p>Current Registrations: {event.registrations.length}</p>
          {console.log(event)}
          <p>&nbsp;</p>
        </li>
      );
  });

  return (
    <div style={containerStyle}>
      <ul>{events}</ul>
    </div>
  );
}

export default EventList;
