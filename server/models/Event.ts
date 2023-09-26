import mongoose, { Schema } from 'mongoose';
import dayjs from 'dayjs'; 
// Import the overall schema version and schema date from the index.ts file
import { schemaVersion, schemaDate } from './index';

// either use this as an independent table, or use pared down versions of it as a subdocument table for both Users and Events...
// Need to establish revenue tracking here.

const eventSchema = new Schema({
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
  // backreference is useful for building lists of users at an event
  name: {
    type: String,
    index: true,
    required: false,
    unique: true,
    sparse: true,
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
  registrations: [
    {
      // kept in a separated table due to query atomicity
      type: Schema.Types.ObjectId,
      ref: 'Registration',
    },
  ],
  dateCutoff: {
    type: Date,
    required: true,
    alias: 'registrationCutoffDate', // version 0.0.4 registrationCutoffDate -> 0.0.5 dateCutoff
  },
  // NEW version 0.0.5 feeRegistration
  feeRegistration: {
    // MUST be integers (pennies) for USD, due to multiplication rounding errors.  Not all currencies are USD.  MVP says USD for now.
    type: Number,
    required: true,
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
    required: true,
    get: (v: number) => {
      return Math.round(v);
    },
    set: (v: number) => {
      return Math.round(v);
    },
  },
  venues: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Venue',
      required: true,
    },
  ],
  registrationPaymentRequiredDate: {
    type: Date,
    required: true,
  },
  //   organizerUserId: User.schema,
  organizerUserId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
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
