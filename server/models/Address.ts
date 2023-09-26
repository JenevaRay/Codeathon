// TODO: import dayjs from 'dayjs'; and use it to further implement schema versioning
import mongoose, { Schema } from 'mongoose';
import dayjs from 'dayjs'; 
// Import the overall schema version and schema date from the index.ts file
import { schemaVersion, schemaDate } from './index';

// possible features (definitely not MVP):
// corporate correspondence address?  legally a good idea...
// venue address notes (i.e. do not park at Bob's Diner)
// venue latitude/longitude, for regional searches, can be easily entered via map click...

const addressSchema = new Schema({
  // implied: _id of type mongoose.ObjectId
  schemaVersion: {
    // used internally in case things change
    type: String,
    required: true,
  },
  schemaDate: {
    // used internally in case things change
    type: Date,
    required: true,
  },
  streetAddress: {
    type: String,
    trim: true,
    required: true,
    alias: 'line1', // line1 is too vague
  },
  extendedAddress: {
    type: String,
    trim: true,
    required: false,
    alias: 'line2', // line2 is too vague
  },
  country: {
    // format TBD, we could use country codes (i.e. GB for Great Britain, US for United States, etc?)
    type: String,
    index: true,
    trim: true,
    required: true,
  },
  state: {
    // subdivision of country, i.e. state, territory, etc
    type: String,
    index: true,
    trim: true,
    required: true,
    alias: 'venueProvince',
  },
  county: {
    type: String,
    trim: true,
    sparse: true,
  },
  city: {
    // i.e. Salt Lake City
    type: String,
    trim: true,
    required: true,
    alias: 'venueCity',
  },
  postalCode: {
    // other countries use other types of postal code.
    type: String,
    trim: true,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  // name clarified: users is the only one-to-many relationship to this, isPrimary means nothing to venue one-to-one relationships.
  isUserPrimary: {
    type: Boolean,
    required: true,
  },
});

addressSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.schemaVersion = schemaVersion;
    this.schemaDate = schemaDate.toDate();
  }
  next();
});

const Address = mongoose.model('Address', addressSchema);

export { Address };
