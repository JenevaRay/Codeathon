// Import all models
import { User } from './User';
import { Venue } from './Venue';
import { Registration } from './Registration';
import { Event } from './Event';
import { Group } from './Group';
import { Address } from './Address';
import { Phone } from './Phone';
import dayjs from 'dayjs';

// Define a schema version and a schema date for future compatibility
const schemaVersion = '0.0.5'; // 0.0.5 due to suggestions by AH
const schemaDate = dayjs('2023-09-25');

// Export all models plus the schema version and schema date
export {
  User,
  Venue,
  Registration,
  Event,
  Group,
  Address,
  Phone,
  schemaVersion,
  schemaDate,
};
