'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
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
Object.defineProperty(exports, '__esModule', { value: true });
exports.Event = void 0;
const mongoose_1 = __importStar(require('mongoose'));
// Import the overall schema version and schema date from the index.ts file
const index_1 = require('./index');
// either use this as an independent table, or use pared down versions of it as a subdocument table for both Users and Events...
// Need to establish revenue tracking here.
const eventSchema = new mongoose_1.Schema({
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
  name: {
    type: String,
    index: true,
    required: true,
    trim: true,
    unique: true,
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
  dateCutoff: {
    type: Date,
    alias: 'registrationCutoffDate', // version 0.0.4 registrationCutoffDate -> 0.0.5 dateCutoff
  },
  // NEW version 0.0.5 feeRegistration
  feeRegistration: {
    // MUST be integers (pennies) for USD, due to multiplication rounding errors.  Not all currencies are USD.  MVP says USD for now.
    type: Number,
    get: (v) => {
      return Math.round(v);
    },
    set: (v) => {
      return Math.round(v);
    },
  },
  // NEW version 0.0.5 feeVenue
  feeVenue: {
    // MUST be integers (pennies) for USD, due to multiplcation rounding errors.  Not all currencies are USD.  MVP says USD for now.
    type: Number,
    get: (v) => {
      return Math.round(v);
    },
    set: (v) => {
      return Math.round(v);
    },
  },
  organizerUserId: {
    type: mongoose_1.default.Types.ObjectId,
    ref: 'User',
  },
  venues: [
    {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'Venue',
      required: true,
    },
  ],
  registrations: [
    {
      // kept in a separated table due to query atomicity
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'Registration',
    },
  ],
  // NEW version 0.0.5
  groups: [
    {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'Group',
    },
  ],
});
eventSchema.pre('save', function (next) {
  return __awaiter(this, void 0, void 0, function* () {
    if (this.isNew) {
      this.schemaVersion = index_1.schemaVersion;
      this.schemaDate = index_1.schemaDate.toDate();
    }
    next();
  });
});
const Event = mongoose_1.default.model('Event', eventSchema);
exports.Event = Event;
//# sourceMappingURL=Event.js.map
