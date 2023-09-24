// TODO: import dayjs from 'dayjs'; and use it to further implement schema versioning
import mongoose, { Schema } from 'mongoose';

// Import the overall schema version and schema date from the index.ts file
import { schemaVersion, schemaDate } from './index';

// possible features (definitely not MVP):
// corporate correspondence address?  legally a good idea...
// venue address notes (i.e. do not park at Bob's Diner)
// venue latitude/longitude, for regional searches, can be easily entered via map click...

const venueSchema = new Schema({
  // implied: _id of type mongoose.ObjectId
  schemaVersion: {
    // used internally in case things change
    type: String,
    required: true
  },
  schemaDate: {
    // used internally in case things change
    type: Date,
    required: true
  },
  // professional locations would have a name, impromptu locations might not
  name: {
    type: String,
    trim: true,
    index: true,
    unique: true,
    // allow for nullable unique values
    sparse: true
  },
  venueStreetAddress: {
    // i.e. 123 Sesame Street
    type: String,
    trim: true,
    required: true,
  },
  venueExtendedAddress: {
    // i.e. room 101-A
    type: String,
    trim: true,
    required: false
  },
  venueCountry: {
    // format TBD, we could use country codes (i.e. GB for Great Britain, US for United States, etc?)
    type: String,
    index: true,
    trim: true,
    required: true
  },
  venueProvince: {
    // subdivision of country, i.e. state, territory, etc
    type: String,
    index: true,
    trim: true,
    required: true
  },
  venueMunicipality: {
    // i.e. county...  for very small nation-states, i.e. Vatican, omit.
    type: String,
    trim: true,
    sparse: true
  },
  venueCity: {
    // i.e. Salt Lake City
    type: String,
    trim: true,
    required: true
  },
  venuePostalCode: {
    // other countries use other types of postal code.
    type: String,
    trim: true,
    required: true
  },
  venueTimeZone: {
    // format to be determined, examples like "UTC" or "MDT" are strings..
    type: String,
    trim: true,
    required: true
  },
  hostId: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true,
    ref: 'User'
  }
})

venueSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.schemaVersion = schemaVersion;
    this.schemaDate = schemaDate.toDate();
  }
  next()
})

const Venue = mongoose.model('Venue', venueSchema)

export { Venue }
