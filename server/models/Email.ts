// import mongoose, { Schema } from 'mongoose';
// import dayjs from 'dayjs';
// // Import the overall schema version and schema date from the index.ts file
// import { schemaVersion, schemaDate } from './index';

// const emailSchema = new Schema({
//   // implied: _id of type mongoose.ObjectId
//   schemaVersion: {
//     // used internally in case things change
//     type: String,
//     required: true,
//     // Set default version to 1.0
//     default: '1.0',
//   },
//   schemaDate: {
//     // used internally in case things change
//     type: Date,
//     required: true,
//     // Set default to current date
//     default: dayjs().toDate(),
//   },
//   emailAddress: {
//     type: String,
//     trim: true,
//     required: true,
//   },
//   isUserPrimary: {
//     // isPrimary makes no sense for the one-to-one relationship for Venues
//     type: Boolean,
//     required: true,
//   },
// });

// emailSchema.pre('save', async function (next) {
//   if (this.isNew) {
//     this.schemaVersion = schemaVersion;
//     this.schemaDate = schemaDate.toDate();
//   }
//   next();
// });

// const Email = mongoose.model('Email', emailSchema);

// export { Email };
