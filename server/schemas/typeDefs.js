'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require('apollo-server-express');
// TODO: Event is missing all DATE types (startTime, endTime, registrationCutoffDate, registrationPaymentRequiredDate).  Documentation succests a 'scalar Date' for custom defs, I'm inclined to just pass the Date as-is (string) and parse it user-side, due to built in timezone info.
const typeDefs = (0, apollo_server_express_1.gql)`
  type User {
    _id: ID
    schemaVersion: String
    schemaDate: String
    emailAddress: String
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

  type Registration {
    _id: ID
    userId: User
    eventId: Event
    role: String
    paid: Boolean
  }

  type Event {
    _id: ID
    schemaVersion: String
    schemaDate: String
    name: String
    dateStart: String
    dateEnd: String
    dateCutoff: String
    feeRegistration: Int
    feeVenue: Int
    organizerUserId: User
    venues: [Venue]
    registrations: [Registration]
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

  type Status {
    completed: Boolean
  }

  type Mutation {
    login(emailAddress: String!, password: String!): Auth
    addRegistration(
      eventId: String!
      userId: String!
      type: String
    ): Registration
    payRegistrations(
      registrationIds: [String]!
      userId: String!
      type: String
    ): [Registration]
    addEvent(
      name: String!
      dateStart: String!
      dateEnd: String!
      venueId: String!
    ): Event
    addUser(
      emailAddress: String!
      password: String!
      nameLast: String!
      nameFirst: String!
    ): Auth
    myEvents(organizerUserId: String!): [Event]
  }
`;
exports.typeDefs = typeDefs;
//# sourceMappingURL=typeDefs.js.map
