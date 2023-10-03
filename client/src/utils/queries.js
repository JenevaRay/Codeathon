import { gql } from '@apollo/client';

const QUERY_EVENTS = gql`
  query Events {
    events {
      _id
      dateCutoff
      dateEnd
      dateStart
      feeRegistration
      feeVenue
      name
      groups {
        _id
        name
        projectName
        projectDescription
      }
      registrations {
        _id
        userId {
          _id
          emailAddress
          nameLast
          nameFirst
          nameMiddle
          addressStreet
          addressExtended
          addressCity
          addressState
          addressPostalCode
          addressCountry
          phoneNumber
          phoneType
        }
        role
        paid
      }
      organizerUserId {
        _id
        emailAddress
        nameLast
        nameFirst
        nameMiddle
        addressStreet
        addressExtended
        addressCity
        addressState
        addressPostalCode
        addressCountry
        phoneNumber
        phoneType
      }
      venues {
        _id
        name
        addressStreet
        addressExtended
        addressCity
        addressState
        addressPostalCode
        addressCountry
        phoneNumber
        website
      }
    }
  }
`;

// const QUERY_EVENTS = gql`
//   query Events {
//     events {
//       _id
//       name
//       registrationPaymentRequiredDate
//       dateStart
//       dateEnd
//       dateCutoff
//       feeRegistration
//       feeVenue
//       groups {
//         _id
//       }
//       organizerUserId {
//         _id
//         nameFirst
//         nameLast
//         email
//         emailType
//         otherContactMethod
//         preferredContactMethod
//         phoneNumbers {
//           _id
//           number
//           type
//           isUserPrimary
//         }
//       }
//       registrations {
//         _id
//         paid
//         role
//       }
//       venues {
//         _id
//         addressId {
//           streetAddress
//           extendedAddress
//           city
//         }
//         hostId {
//           nameFirst
//           nameLast
//         }
//         name
//         phoneId {
//           number
//         }
//         venueTimeZone
//       }
//     }
//   }
// `;

const QUERY_USERS = gql`
  query Users {
    users {
      _id
      email
      emailType
      nameFirst
      nameLast
      otherContactMethod
      preferredContactMethod
      streetAddress
      extendedAddress
      city
      county
      state
      country
      postalCode
    }
  }
`;

const QUERY_REGISTRATIONS = gql`
  query Registrations {
    registrations {
      _id
      eventId {
        name
        dateStart
        dateEnd
        feeRegistration
        feeVenue
      }
      paid
      role
      userId {
        _id
      }
    }
  }
`;

const QUERY_VENUES = gql`
  query Venues {
    venues {
      name
      addressId {
        streetAddress
        extendedAddress
        city
        city
        state
        county
        postalCode
      }
    }
  }
`;

const QUERY_GROUPS = gql`
  query Groups {
    groups {
      name
      projectDescription
      registrations {
        paid
        role
        eventId {
          dateStart
          dateEnd
        }
        userId {
          nameFirst
          nameLast
          preferredContactMethod
          email
          phoneNumbers {
            number
          }
        }
      }
      eventId {
        venues {
          addressId {
            streetAddress
            extendedAddress
            city
            state
            country
          }
        }
      }
    }
  }
`;

export {
  QUERY_EVENTS,
  QUERY_USERS,
  QUERY_REGISTRATIONS,
  QUERY_VENUES,
  QUERY_GROUPS,
};
