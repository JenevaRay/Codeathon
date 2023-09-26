// TODO: import dayjs from 'dayjs'; and use it to further implement schema versioning
import mongoose, { Schema } from 'mongoose';

// Import the overall schema version and schema date from the index.ts file
import { schemaVersion, schemaDate } from './index';

// possible features (definitely not MVP):
// corporate correspondence address?  legally a good idea...
// venue address notes (i.e. do not park at Bob's Diner)
// venue latitude/longitude, for regional searches, can be easily entered via map click...

const phoneSchema = new Schema({
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
  number: {
    type: String, // because just numbers won't do.  extension?  intl phone?
    trim: true,
    required: true,
  },
  type: {
    // mobile, cell, voip, pager, home, etc
    type: String,
    required: true,
  },
  isUserPrimary: {
    // isPrimary makes no sense for the one-to-one relationship for Venues
    type: Boolean,
    required: true,
  },
});

phoneSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.schemaVersion = schemaVersion;
    this.schemaDate = schemaDate.toDate();
  }
  next();
});

const Phone = mongoose.model('Phone', phoneSchema);

export { Phone };
