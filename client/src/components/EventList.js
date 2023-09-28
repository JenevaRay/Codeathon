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

  const strToDayJS = function(unixEpochStr) {
    return dayjs(new Date(Number(unixEpochStr)))
  }

  const events = data.events.map((event) => {
    const expiry = (strToDayJS(event.dateStart) > dayjs(Date.now()))? "FUTURE" : ((strToDayJS(event.dateEnd) > dayjs(Date.now()))? "CURRENT" : "EXPIRED")
    if (expiry === "EXPIRED") {
        
    }
    return (
    <li key={event._id} style={eventItemStyle}>
      <p>{expiry}</p>
      <p>event name {event.name}</p>
      <p>
        event posted by {event.organizerUserId.nameFirst}{' '}
        {event.organizerUserId.nameLast}
      </p>
      <p>
        event starts {strToDayJS(event.dateStart).format("MM/DD/YY [at] HH:mm")}</p><p> event finishes {strToDayJS(event.dateEnd).format("MM/DD/YY [at] HH:mm")}, and current time is {Date.now()}
        {/* event starts {(Number(event.dateStart)<nowTime)} and finished {Number(event.dateEnd)<nowTime} */}
      </p>
      <p>registrations must be done before {event.dateCutoff}</p>
      <p>registration fee is {event.feeRegistration + event.feeVenue}</p>
      
      <button onClick={()=>{registerForEvent(event._id)}} style={buttonStyle}>REGISTER</button>
      <ul>REGISTRATIONS:{event.registrations.map((registration)=>(<li key={registration._id}>{registration._id}</li>))}</ul>
      <p>groups are included in the query</p>
      {console.log(event)}
      <p>&nbsp;</p>
    </li>
  )});

  const profile = Auth.getProfile()
  return (
    <div style={containerStyle}>
        <h2>My ID: {profile.data._id}</h2>
        <hr />
      <ul>{events}</ul>
    </div>
  );
}

export default EventList;
