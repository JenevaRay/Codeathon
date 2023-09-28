import { useEffect } from 'react';
import dayjs from 'dayjs'
// import Event from '../Event'
// import { useStoreContext } from '../utils/GlobalState'
// import { useStoreContext } from ''

import { gql, useQuery } from '@apollo/client';
// import { useEffect } from 'react';
// import Event from '../Event'
// import { useStoreContext } from '../utils/GlobalState'
// import { useStoreContext } from ''

import { useStoreContext, QUERY_EVENTS, Auth } from '../utils/';
// import dayjs from 'dayjs';

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
  }`
*/

function registerForEvent(eventId) {
    console.log(eventId)
    console.log("TEST")
}

function EventList() {
  const nowTime = Date.now()
  const { loading, error, data } = useQuery(QUERY_EVENTS);
  const [state, dispatch] = useStoreContext();
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const { currentEvent } = state;

  //   console.log(data.events[0]);
  console.log(state)

  const events = data.events.map((event) => (
    <li key={event._id}>
      <p>event name {event.name}</p>
      <p>event _id {event._id}</p>
      <p>
        event posted by {event.organizerUserId.nameFirst}{' '}
        {event.organizerUserId.nameLast}
      </p>
      <p>
        event starts {dayjs(new Date(Number(event.dateStart))).format("MM/DD/YY [at] HH:mm")} and finished {event.dateEnd}, and current time is {Date.now()}
        {/* event starts {(Number(event.dateStart)<nowTime)} and finished {Number(event.dateEnd)<nowTime} */}
      </p>
      <p>registrations must be done before {event.dateCutoff}</p>
      <p>registration fee is {event.feeRegistration + event.feeVenue}</p>
      <p>timeNOW = {Date.now()}</p>
      <button onClick={()=>{registerForEvent(event._id)}}>REGISTER</button>
      <ul>REGISTRATIONS:{event.registrations.map((registration)=>(<li key={registration._id}>{registration._id}</li>))}</ul>
      <p>groups are included in the query</p>
      {console.log(event)}
      <p>&nbsp;</p>
    </li>
  ));

  const profile = Auth.getProfile()
  return (
    <div>
        <h2>My ID: {profile.data._id}</h2>
        <hr />
      <ul>{events}</ul>
    </div>
  );
}

export default EventList;
