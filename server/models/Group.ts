// TODO: import dayjs from 'dayjs'; and use it to further implement schema versioning
import mongoose, { Schema } from 'mongoose';

// Import the overall schema version and schema date from the index.ts file
import { schemaVersion, schemaDate } from './index';

// either use this as an independent table, or use pared down versions of it as a subdocument table for both Users and Events...
// Feature: can add a paidTimeUTC - so that we know who paid when, useful for invoice lookups

const groupSchema = new Schema({
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
  registrations: [
    {
      // kept in a separated table due to query atomicity
      type: Schema.Types.ObjectId,
      ref: 'Registration'
    }
  ],
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  project: {
    type: String,
    required: false
  }
})

groupSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.schemaVersion = schemaVersion;
    this.schemaDate = schemaDate.toDate();
  }
  next()
})

const Group = mongoose.model('Group', groupSchema)

export { Group }
