import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt, { SignOptions } from 'jsonwebtoken';
import { Model, Schema, model, Document } from 'mongoose';

// Import the overall schema version and schema date from the index.ts file
import {
  schemaVersion,
  schemaDate,
} from './index';

dotenv.config();

interface IUser extends Document {
  schemaVersion: string;
  schemaDate: Date;
  emailAddress: string;
  password: string;
  nameLast: string;
  nameFirst: string;
  nameMiddle: string;
  addressStreet: string;
  addressExtended: string;
  addressCity: string;
  addressState: string;
  addressPostalCode: string;
  addressCountry: string;
  phoneNumber: string;
  phoneType: string;
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
  emailAddress: {
    type: String,
    alias: 'username',
    index: true,
    lowercase: true,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    // TODO: #66 Add password validation beyond minlength
    // match: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/
    minlength: 12,
  },
  nameLast: {
    type: String,
    required: true,
    trim: true,
  },
  nameFirst: {
    type: String,
    required: true,
    trim: true,
  },
  nameMiddle: {
    type: String,
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
  phoneType: {
    type: String,
    trim: true,
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
    { expiresIn: '24h' } as SignOptions,
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
    const saltRounds = 9;
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
