<<<<<<< HEAD
import { useEffect } from 'react';
// import Event from '../Event'
// import { useStoreContext } from '../utils/GlobalState'
// import { useStoreContext } from ''
import { useStoreContext } from '../utils/';

import { gql, useQuery } from '@apollo/client';
=======
// import { useEffect } from 'react';
// import Event from '../Event'
// import { useStoreContext } from '../utils/GlobalState'
// import { useStoreContext } from ''
import { useQuery } from '@apollo/client';

import { useStoreContext, QUERY_EVENTS } from '../utils/';
// import dayjs from 'dayjs';
>>>>>>> 75d5bc21fdc0f50b844c12ace2c18a51556270db

/*
  query Events {
    events {
      name
      registrationPaymentRequiredDate
      dateStart
      dateEnd
      dateCutoff
      feeRegistration
      feeVenue
      groups {
        _id
      }
      organizerUserId {
        _id
        nameFirst
        nameLast
        email
        emailType
        otherContactMethod
        preferredContactMethod
        phoneNumbers {
          _id
          number
          type
          isUserPrimary
        }
      }
      registrations {
        _id
        paid
        role
      }
      venues {
        _id
        addressId {
          streetAddress
          extendedAddress
          city
        }
        hostId {
          nameFirst
          nameLast
        }
        name
        phoneId {
          number
        }
        venueTimeZone
      }
    }
  }
<<<<<<< HEAD
`;

const EventList = () => {
  const { loading, error, data } = useQuery(QUERY_EVENTS);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return <div>Text</div>;
  // const [state, dispatch] = useStoreContext()

  // const { currentEvent } = state

  // const { loading, data } = useQuery(QUERY_EVENTS)

  // useEffect(()=>{
  //     console.log(loading)
  //     console.log(data)
  //     if(data) {

  //         console.log(data)
  //     } else if (!loading) {

  //     }
  // }, [data, loading, dispatch])
};

=======
*/

function EventList() {
  const { loading, error, data } = useQuery(QUERY_EVENTS);
  const [state, dispatch] = useStoreContext();
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const { currentEvent } = state;

  //   console.log(data.events[0]);
  const events = data.events.map((event) => (
    <li key={event._id}>
      <p>event name {event.name}</p>
      <p>event _id {event._id}</p>
      <p>
        event posted by {event.organizerUserId.nameFirst}{' '}
        {event.organizerUserId.nameLast}
      </p>
      <p>
        event starts {event.dateStart} and finished {event.dateEnd}
      </p>
      <p>registrations must be done before {event.dateCutoff}</p>
      <p>registration fee is {event.feeRegistration + event.feeVenue}</p>
      <p>groups are included in the query</p>
      <p>&nbsp;</p>
    </li>
  ));
  return (
    <div>
      <ul>{events}</ul>
    </div>
  );
}

>>>>>>> 75d5bc21fdc0f50b844c12ace2c18a51556270db
export default EventList;
