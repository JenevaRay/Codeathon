import dayjs from 'dayjs';
import { ADD_REGISTRATION, ADD_EVENT, MY_EVENTS } from '../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';
import { useStoreContext, QUERY_EVENTS, Auth } from '../utils';

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

function AddEvent() {
  //   let profile
  //   if (Auth.loggedIn()) {
  //     profile = Auth.getProfile()
  //   }
  //   const query_info = useQuery(QUERY_EVENTS);
  //   const [state, dispatch] = useStoreContext();
  //   const [MyEvents, mutation_info] = useMutation(MY_EVENTS)
  //   const { data, loading, error } = mutation_info;

  //   const getMyEvents = async ()=>{
  //     if (profile.data) {
  //         const data = profile.data
  //         if (data._id) {
  //             const userId = data._id
  //             try {
  //                 const mutationResponse = await MyEvents({
  //                     variables: {organizerUserId: userId}
  //                 })
  //                 console.log(mutationResponse)
  //             } catch (e) {
  //               console.log(e)
  //             }
  //         }
  //     }
  //   }

  //   if (query_info.loading) return 'Loading...';
  //   if (query_info.error) return `Error! ${query_info.error.message}`;

  //   const strToDayJS = function (unixEpochStr) {
  //     return dayjs(new Date(Number(unixEpochStr)));
  //   };

  //   const events = query_info.data.events.map((event) => {
  //     // registrations must be submitted before event.dateCutoff
  //     const expiry =
  //       strToDayJS(event.dateStart) > dayjs(Date.now())
  //         ? 'FUTURE'
  //         : strToDayJS(event.dateEnd) > dayjs(Date.now())
  //         ? 'CURRENT'
  //         : strToDayJS(event.dateCutoff) < dayjs(Date.now())
  //         ? 'OVERDUE'
  //         : 'EXPIRED';
  //     const costStr = String(event.feeRegistration + event.feeVenue);
  //     const cost = ['$', costStr.slice(0, -2), '.', costStr.slice(2)];
  //       return (
  //         <li
  //           key={event._id}
  //           style={eventItemStyle}>
  //           <p>
  //             <h2>{expiry}</h2>
  //             <em>{event.name}</em> hosted by {event.organizerUserId.nameFirst}{' '}
  //             {event.organizerUserId.nameLast}
  //           </p>
  //           <p>
  //             {strToDayJS(event.dateStart).format('MM/DD/YY [at] HH:mm')} - to -{' '}
  //             {strToDayJS(event.dateEnd).format('MM/DD/YY [at] HH:mm')}
  //           </p>
  //           <p>Registrations: {event.registrations.length}</p>
  //           {console.log(event)}
  //           <p>&nbsp;</p>
  //         </li>
  //       );
  //   });

  return <div style={containerStyle}>ADD EVENT FORM</div>;
}

export default AddEvent;
