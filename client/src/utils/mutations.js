import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($emailAddress: String!, $password: String!) {
    login(emailAddress: $emailAddress, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_REGISTRATION = gql`
  mutation AddRegistration($userId: String!, $eventId: String!, $type: String) {
    addRegistration(userId: $userId, eventId: $eventId, type: $type) {
      paid
      role
      _id
      eventId {
        _id
        feeRegistration
        registrationPaymentRequiredDate
      }
    }
  }
`;

export const MY_EVENTS = gql`
mutation MyEvents($organizerUserId: String!) {
    myEvents(organizerUserId: $organizerUserId) {
      _id
      name
      venues {
        addressId {
          streetAddress
          extendedAddress
          country
          state
          county
          city
          postalCode
        }
        name
        venueTimeZone
        phoneId {
          number
          type
        }
      }
    }
  }
`

export const ADD_USER = gql`
mutation Mutation($emailAddress: String!, $password: String!, $nameLast: String!, $nameFirst: String!) {
  addUser(emailAddress: $emailAddress, password: $password, nameLast: $nameLast, nameFirst: $nameFirst) {
    token
    user {
      _id
    }
  }
}`