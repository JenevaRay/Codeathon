'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.User = void 0;
const bcrypt_1 = __importDefault(require('bcrypt'));
const dotenv_1 = __importDefault(require('dotenv'));
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const mongoose_1 = require('mongoose');
// Import the overall schema version and schema date from the index.ts file
const index_1 = require('./index');
dotenv_1.default.config();
// possible features (definitely not MVP):
// internal messaging if no contact info?
// comments, like allergies, emergency contact info, admin reviews?
const userSchema = new mongoose_1.Schema({
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
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'Registration',
    },
  ],
});
// Function to generate a JWT token for a user
userSchema.methods.generateAuthToken = function () {
  const token = jsonwebtoken_1.default.sign(
    // Include user-specific data as payload
    { _id: this._id },
    // Replace with secret key
    process.env.SECRET_KEY,
    // Set expiration time @ 2hrs
    { expiresIn: '24h' },
  );
  return token;
};
// Create a static function to verify a JWT token for a user
userSchema.statics.verifyAuthToken = function (token) {
  try {
    // Verify the token with secret key
    const decoded = jsonwebtoken_1.default.verify(
      token,
      process.env.SECRET_KEY,
    );
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};
userSchema.pre('save', function (next) {
  return __awaiter(this, void 0, void 0, function* () {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 9;
      this.password = yield bcrypt_1.default.hash(this.password, saltRounds);
    }
    if (this.isNew) {
      this.schemaVersion = index_1.schemaVersion;
      this.schemaDate = index_1.schemaDate.toDate();
    }
    next();
  });
});
userSchema.methods.isCorrectPassword = function (password) {
  return __awaiter(this, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(password, this.password);
  });
};
const User = (0, mongoose_1.model)('User', userSchema);
exports.User = User;
//# sourceMappingURL=User.js.map
