// TODO: import dayjs from 'dayjs'; and use it to further implement schema versioning
import mongoose, { Schema } from 'mongoose';
import dayjs from 'dayjs';
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
    required: true,
    default: '1.0',
  },
  schemaDate: {
    // used internally in case things change
    type: Date,
    required: true,
    default: dayjs().toDate(),
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
  addressId: {
    type: Schema.Types.ObjectId,
    ref: 'Address',
    required: true
  },
  venueTimeZone: {
    // format to be determined, examples like "UTC" or "MDT" are strings..
    type: String,
    trim: true,
    required: true
  },
  phoneId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Phone'
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
