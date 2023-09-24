import { User } from './User'
import { Venue } from './Venue'
import { Registration } from './Registration'
import { Event } from './Event'
import { Group } from './Group'

// probably need to implement order and checkout tables for sales of tickets.

// a schema version, because we don't know if a client will try to reconnect a year later...
const schemaVer = '0.0.1-09/22/23'

export { User, Venue, Registration, Event, Group, schemaVer }
