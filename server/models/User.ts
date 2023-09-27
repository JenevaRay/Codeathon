import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import mongoose, { Schema } from 'mongoose';

// Import the overall schema version and schema date from the index.ts file
import {
  // Phone,
  schemaVersion,
  schemaDate,
} from './index';


// possible features (definitely not MVP):
// internal messaging if no contact info?
// comments, like allergies, emergency contact info, admin reviews?

const userSchema = new Schema({
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
  nameFirst: {
    type: String,
    required: true,
    trim: true,
    alias: 'firstName',
  },
  nameLast: {
    type: String,
    required: true,
    trim: true,
    alias: 'lastName',
  },
  // being kept one field for future user registration/authentication, if we can properly utilize multiple fields for this, then we can reimplement.  Naturally, there is no primary of a single email.
  email: {
    type: String,
    trim: true,
    index: true,
    unique: true,
    // this allows for nullable unique identifiers
    sparse: true,
  },
  addresses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Address',
      required: true,
    },
  ],
  emailType: {
    type: String,
    trim: true,
    required: true,
  },
  phoneNumbers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Phone',
      required: true,
    },
  ],
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
    minlength: 12,
  },
  registrations: [
    {
      // kept in a separated table due to query atomicity
      type: Schema.Types.ObjectId,
      ref: 'Registration',
    },
  ],
});

// Function to generate a JWT token for a user
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    // Include user-specific data as payload
    { _id: this._id }, 
    // Replace with secret key
    'your-secret-key', 
    // Set expiration time @ 2hrs
    { expiresIn: '2h' } 
  );
  return token;
};

// Create a static function to verify a JWT token for a user
userSchema.statics.verifyAuthToken = function(token) {
  try {
    // Verify the token with secret key
    const decoded = jwt.verify(token, 'your-secret-key'); 
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 20;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  if (this.isNew) {
    this.schemaVersion = schemaVersion;
    this.schemaDate = schemaDate.toDate();
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export { User };
