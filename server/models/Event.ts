import mongoose, { Schema } from 'mongoose';
// Import the overall schema version and schema date from the index.ts file
import { schemaVersion, schemaDate } from './index';

// either use this as an independent table, or use pared down versions of it as a subdocument table for both Users and Events...
// Need to establish revenue tracking here.

const eventSchema = new Schema({
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
    index: true,
    required: true,
    trim: true,
    unique: true,
  },
  dateStart: {
    // local to the venue's timezone
    type: Date,
    required: true,
    alias: 'startTime', // version 0.0.4 startTime -> 0.0.5 dateStart
  },
  dateEnd: {
    // local to the venue's timezone
    type: Date,
    required: true,
    alias: 'startTime', // version 0.0.4 startTime -> 0.0.5 dateEnd
  },
  dateCutoff: {
    type: Date,
    alias: 'registrationCutoffDate', // version 0.0.4 registrationCutoffDate -> 0.0.5 dateCutoff
  },
  // NEW version 0.0.5 feeRegistration
  feeRegistration: {
    // MUST be integers (pennies) for USD, due to multiplication rounding errors.  Not all currencies are USD.  MVP says USD for now.
    type: Number,
    get: (v: number) => {
      return Math.round(v);
    },
    set: (v: number) => {
      return Math.round(v);
    },
  },
  // NEW version 0.0.5 feeVenue
  feeVenue: {
    // MUST be integers (pennies) for USD, due to multiplcation rounding errors.  Not all currencies are USD.  MVP says USD for now.
    type: Number,
    get: (v: number) => {
      return Math.round(v);
    },
    set: (v: number) => {
      return Math.round(v);
    },
  },
  organizerUserId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  venues: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Venue',
      required: true,
    },
  ],
  registrations: [
    {
      // kept in a separated table due to query atomicity
      type: Schema.Types.ObjectId,
      ref: 'Registration',
    },
  ],
  // NEW version 0.0.5
  groups: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Group',
    },
  ],
});

eventSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.schemaVersion = schemaVersion;
    this.schemaDate = schemaDate.toDate();
  }
  next();
});

const Event = mongoose.model('Event', eventSchema);

export { Event };
