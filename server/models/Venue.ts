import mongoose, { Schema } from 'mongoose';
// Import the overall schema version and schema date from the index.ts file
import { schemaVersion, schemaDate } from './index';

// possible features (definitely not MVP):
// corporate correspondence address?  legally a good idea...
// venue address notes (i.e. do not park at Bob's Diner)
// venue latitude/longitude, for regional searches, can be easily entered via map click...

const venueSchema = new Schema({
  // IMPLIED: _id of type mongoose.ObjectId
  // _id: {
  //   type: Schema.Types.ObjectId,
  //   auto: true,
  // },
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
  name: {
    type: String,
    required: true,
    trim: true,
  },
  addressStreet: {
    type: String,
    trim: true,
  },
  addressExtended: {
    type: String,
    trim: true,
  },
  addressCity: {
    type: String,
    trim: true,
  },
  // TODO: #67 Add support for addresses outside the US or Canada
  // addressCounty: {
  //   type: String,
  //   trim: true,
  // }
  addressState: {
    type: String,
    trim: true,
  },
  addressPostalCode: {
    type: String,
    trim: true,
  },
  addressCountry: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
  events: [
    {
      type: Schema.Types.ObjectId,
      index: true,
      ref: 'Event',
    },
  ],
});

venueSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.schemaVersion = schemaVersion;
    this.schemaDate = schemaDate.toDate();
  }
  next();
});

const Venue = mongoose.model('Venue', venueSchema);

export { Venue };
