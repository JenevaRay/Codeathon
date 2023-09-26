import mongoose, { Schema } from 'mongoose';
import dayjs from 'dayjs';
// Import the overall schema version and schema date from the index.ts file
import { schemaVersion, schemaDate } from './index';

// either use this as an independent table, or use pared down versions of it as a subdocument table for both Users and Events...
// Feature: can add a paidTimeUTC - so that we know who paid when, useful for invoice lookups
// Feature: may need to add a paidAmount number/float.

const registrationSchema = new Schema({
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
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  registrationDate: {
    type: Date,
    required: true,
  },
  registrationType: {
    // for Host, Attendee, and Volunteer
    type: String,
    trim: true,
    required: true,
    alias: 'role', // 0.0.4 role -> 0.0.5 registrationType
  },
  // because revenue matters
  paid: {
    type: Boolean,
    required: true,
  },
});

registrationSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.schemaVersion = schemaVersion;
    this.schemaDate = schemaDate.toDate();
  }
  next();
});

const Registration = mongoose.model('Registration', registrationSchema);

export { Registration };
