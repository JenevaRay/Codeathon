// TODO: import dayjs from 'dayjs'; and use it to further implement schema versioning
import mongoose, { Schema } from 'mongoose';

// Import the overall schema version and schema date from the index.ts file
import { schemaVersion, schemaDate } from './index';

// either use this as an independent table, or use pared down versions of it as a subdocument table for both Users and Events...
// Need to establish revenue tracking here.

const eventSchema = new Schema({
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
  // backreference is useful for building lists of users at an event
  name: {
    type: String,
    index: true,
    required: false,
    unique: true,
    sparse: true
  },
  startTime: {
    // local to the venue's timezone
    type: Date,
    required: true,
  },
  endTime: {
    // local to the venue's timezone
    type: Date,
    required: true
  },
  registrations: [
    {
      // kept in a separated table due to query atomicity
      type: Schema.Types.ObjectId,
      ref: 'Registration'
    }
  ],
  registrationCutoffDate: {
    type: Date,
    required: true,
  },
  registrationPaymentRequiredDate: {
    type: Date,
    required: true,
  },
  organizerUserId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
})

eventSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.schemaVersion = schemaVersion;
    this.schemaDate = schemaDate.toDate();
  }
  next()
})

const Event = mongoose.model('Event', eventSchema)

export { Event }
