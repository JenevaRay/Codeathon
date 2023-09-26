import bcrypt from 'bcrypt';
// TODO: import dayjs from 'dayjs'; and use it to further implement schema versioning
import dayjs from 'dayjs';
import mongoose, { Schema } from 'mongoose';

// Import the overall schema version and schema date from the index.ts file
import { 
    // Phone, 
    schemaVersion, schemaDate } from './index';

// import { Registration } from './Registration'

// possible features (definitely not MVP):
// internal messaging if no contact info?
// comments, like allergies, emergency contact info, admin reviews?

const userSchema = new Schema({
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
    // Default is set to the current date
    default: dayjs().toDate(),
  },
  nameFirst: {
    type: String,
    required: true,
    trim: true,
    alias: 'firstName'
  },
  nameLast: {
    type: String,
    required: true,
    trim: true,
    alias: 'lastName'
  },
  // being kept one field for future user registration/authentication, if we can properly utilize multiple fields for this, then we can reimplement.  Naturally, there is no primary of a single email.
  email: {
    type: String,
    trim: true,
    index: true,
    unique: true,
    // this allows for nullable unique identifiers
    sparse: true
  },
  addresses: [{
    type: Schema.Types.ObjectId,
    ref: 'Address',
    required: true
  }],
  emailType: {
    type: String,
    trim: true,
    required: true
  },
  phoneNumbers: [{
    type: Schema.Types.ObjectId,
    ref: 'Phone',
    required: true
  }],
//   phoneNumbers: [Phone.schema],
  otherContactMethod: {
    type: String,
    trim: true,
  },
  preferredContactMethod: {
    type: String,
    trim: true,
    // require at least one valid contact method from the user's profile.
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 12
  },
  registrations: [
    {
      // kept in a separated table due to query atomicity
      type: Schema.Types.ObjectId,
      ref: 'Registration'
    }
  ]
})

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 20
    this.password = await bcrypt.hash(this.password, saltRounds)
  }
  if (this.isNew) {
    this.schemaVersion = schemaVersion;
    this.schemaDate = schemaDate.toDate();
  }
  next()
})

userSchema.methods.isCorrectPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)

export { User }
