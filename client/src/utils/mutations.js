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
      }
    }
  }
`;

export const MY_EVENTS = gql`
  mutation MyEvents($organizerUserId: String!) {
    myEvents(organizerUserId: $organizerUserId) {
      _id
      name
      dateStart
      dateEnd
      dateCutoff
      feeRegistration
      feeVenue
      registrations {
        _id
        paid
        role
      }
      organizerUserId {
        _id
      }
      venues {
        name
        addressStreet
        addressExtended
        addressCity
        addressState
        addressCountry
        addressPostalCode
        phoneNumber
        website
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation(
    $emailAddress: String!
    $password: String!
    $nameLast: String!
    $nameFirst: String!
  ) {
    addUser(
      emailAddress: $emailAddress
      password: $password
      nameLast: $nameLast
      nameFirst: $nameFirst
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_EVENT = gql`
mutation Mutation($name: String!, $dateStart: String!, $dateEnd: String!, $dateCutoff: String!, $feeRegistration: Int!, $feeVenue: Int!, $venues: [String]!, $organizerUserId: String!) {
  addEvent(name: $name, dateStart: $dateStart, dateEnd: $dateEnd, dateCutoff: $dateCutoff, feeRegistration: $feeRegistration, feeVenue: $feeVenue, venues: $venues, organizerUserId: $organizerUserId) {
    _id
  }
}
`

export const ADD_VENUE = gql`
mutation AddVenue($name: String!, $addressStreet: String, $addressExtended: String, $addressCity: String, $addressState: String, $addressPostalCode: String, $addressCountry: String, $phoneNumber: String, $website: String) {
  addVenue(name: $name, addressStreet: $addressStreet, addressExtended: $addressExtended, addressCity: $addressCity, addressState: $addressState, addressPostalCode: $addressPostalCode, addressCountry: $addressCountry, phoneNumber: $phoneNumber, website: $website) {
    _id
  }
}`