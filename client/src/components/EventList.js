import { useEffect } from 'react';
// import Event from '../Event'
// import { useStoreContext } from '../utils/GlobalState'
// import { useStoreContext } from ''
import { useStoreContext } from '../utils/';

import { gql, useQuery } from '@apollo/client';

const QUERY_EVENTS = gql`
  query Events {
    events {
      name
      registrationPaymentRequiredDate
      dateStart
      dateEnd
      dateCutoff
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

export default EventList;
