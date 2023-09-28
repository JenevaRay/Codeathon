import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { Model, Schema, model, Document } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Import the overall schema version and schema date from the index.ts file
import {
  // Phone,
  schemaVersion,
  schemaDate,
} from './index';

interface IUser extends Document {
  schemaVersion: string;
  schemaDate: Date;
  nameFirst: string;
  nameLast: string;
  email: string;
  addresses: Schema.Types.ObjectId[];
  emailType: string;
  phoneNumbers: Schema.Types.ObjectId[];
  otherContactMethod: string;
  preferredContactMethod: string;
  password: string;
  registrations: Schema.Types.ObjectId[];
}

interface IUserMethods {
  isCorrectPassword(password: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

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
userSchema.methods.generateAuthToken = function (this: IUser) {
  const token = jwt.sign(
    // Include user-specific data as payload
    { _id: this._id },
    // Replace with secret key
    process.env.SECRET_KEY!,
    // Set expiration time @ 2hrs
    { expiresIn: '2h' } as SignOptions,
  );
  return token;
};

// Create a static function to verify a JWT token for a user
userSchema.statics.verifyAuthToken = function (token: string) {
  try {
    // Verify the token with secret key
    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as {
      _id: string;
    };
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

userSchema.methods.isCorrectPassword = async function (
  this: IUser,
  password: string,
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const User = model<IUser, UserModel>('User', userSchema);

export { User };
