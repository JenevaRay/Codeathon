import { gql } from 'apollo-server-express'

// TODO: Event is missing all DATE types (startTime, endTime, registrationCutoffDate, registrationPaymentRequiredDate).  Documentation succests a 'scalar Date' for custom defs, I'm inclined to just pass the Date as-is (string) and parse it user-side, due to built in timezone info.

const typeDefs = gql`
type User {
    schemaVersion: String
    _id: ID
    firstName: String
    lastName: String
    email: String
    phone: String
    otherContactMethod: String
    preferredContactMethod: String
    registrations: [Registration]
}

type Registration {
    schemaVersion: String
    _id: ID
    userId: User
    eventId: Event
    role: String
    paid: Boolean
}

type Event {
    schemaVersion: String
    name: String
    startTime: String
    endTime: String
    registrations: [Registration]
    registrationCutoffDate: String
    registrationPaymentRequiredDate: String
    userId: User
}

type Group {
    schemaVersion: String
    registrations: [Registration]
    eventId: Event
    name: String
    project: String
}

type Venue {
    schemaVersion: String
    name: String
    venueStreetAddress: String
    venueExtendedAddress: String
    venueCountry: String
    venueProvince: String
    venueMunicipality: String
    venueCity: String
    venuePostalCode: String
    venueTimeZone: String
    hostId: User
}

type Query {
    users: [User]
    registrations: [Registration]
    events: [Event]
    groups: [Group]
    venues: [Venue]
}
`

export { typeDefs }