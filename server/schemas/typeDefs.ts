import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

// TODO: Event is missing all DATE types (startTime, endTime, registrationCutoffDate, registrationPaymentRequiredDate).  Documentation succests a 'scalar Date' for custom defs, I'm inclined to just pass the Date as-is (string) and parse it user-side, due to built in timezone info.

const typeDefs: DocumentNode = gql`
  type User {
    _id: ID
    schemaVersion: String
    schemaDate: String
    emailAddress: String
    password: String
    nameLast: String
    nameFirst: String
    nameMiddle: String
    addressStreet: String
    addressExtended: String
    addressCity: String
    addressState: String
    addressPostalCode: String
    addressCountry: String
    phoneNumber: String
    phoneType: String
    registrations: [Registration]
  }

  type Address {
    _id: ID
    streetAddress: String
    extendedAddress: String
    country: String
    state: String
    county: String
    city: String
    postalCode: String
    type: String
    isUserPrimary: Boolean
  }

  type Phone {
    _id: ID
    number: String
    type: String
    isUserPrimary: Boolean
  }

  type Registration {
    _id: ID
    userId: User
    eventId: Event
    role: String
    paid: Boolean
  }

  type Event {
    _id: ID
    name: String
    dateStart: String
    dateEnd: String
    registrations: [Registration]
    dateCutoff: String
    feeRegistration: Int
    feeVenue: Int
    venues: [Venue]
    registrationPaymentRequiredDate: String
    organizerUserId: User
    groups: [Group]
  }

  type Group {
    _id: ID
    registrations: [Registration]
    eventId: Event
    name: String
    projectName: String
    projectDescription: String
  }

  type Venue {
    _id: ID
    schemaVersion: String
    schemaDate: String    
    name: String
    addressStreet: String
    addressExtended: String
    addressCity: String
    addressState: String
    addressPostalCode: String
    addressCountry: String
    phoneNumber: String
    website: String
    events: [Event]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    users: [User]
    registrations: [Registration]
    events: [Event]
    groups: [Group]
    venues: [Venue]
  }

  type Mutation {
    login(emailAddress: String!, password: String!): Auth
    addRegistration(
      eventId: String!
      userId: String!
      type: String
    ): Registration
    addUser(
      emailAddress: String!, nameLast: String!, nameFirst: String!
    ): User
    myEvents(organizerUserId: String!): [Event]
  }
`;

export { typeDefs };
