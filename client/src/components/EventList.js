import { useEffect } from 'react';
// import Event from '../Event'
// import { useStoreContext } from '../utils/GlobalState'
// import { useStoreContext } from ''

import { useStoreContext, QUERY_EVENTS } from '../utils/'
import dayjs from 'dayjs'

import { useQuery } from '@apollo/client'

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
*/

function EventList() {
    const { loading, error, data } = useQuery(QUERY_EVENTS)
    const [state, dispatch] = useStoreContext()
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    const { currentEvent } = state
    
    console.log(data.events[0])
    const events = data.events.map((event)=>(
        <div>
            <p>event name {event.name}</p>
            <p>event posted by {event.organizerUserId.nameFirst} {event.organizerUserId.nameLast}</p>
            <p>event starts {event.dateStart} and finished {event.dateEnd}</p>
            <p>registrations must be done before {event.dateCutoff}</p>
            <p>registration fee is {event.feeRegistration + event.feeVenue}</p>
            <p>groups are included in the query</p>
            <p></p>
        </div>
    ))
    return (<div>{events}</div>)
}

export default EventList;
