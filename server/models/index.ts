import dayjs from 'dayjs';

// Import all models
import { User } from './User'
import { Venue } from './Venue'
import { Registration } from './Registration'
import { Event } from './Event'
import { Group } from './Group'

// Define a schema version and a schema date for future compatibility
const schemaVersion = '0.0.3';
const schemaDate = dayjs('2023-09-24');

// Export all models plus the schema version and schema date
export { User, Venue, Registration, Event, Group, schemaVersion, schemaDate };
