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
Object.defineProperty(exports, '__esModule', { value: true });
exports.Registration = void 0;
const mongoose_1 = __importStar(require('mongoose'));
// Import the overall schema version and schema date from the index.ts file
// import { schemaVersion, schemaDate } from './index';
// either use this as an independent table, or use pared down versions of it as a subdocument table for both Users and Events...
// Feature: can add a paidTimeUTC - so that we know who paid when, useful for invoice lookups
// Feature: may need to add a paidAmount number/float.
const registrationSchema = new mongoose_1.Schema({
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
    type: mongoose_1.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  eventId: {
    type: mongoose_1.Schema.Types.ObjectId,
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
const Registration = mongoose_1.default.model(
  'Registration',
  registrationSchema,
);
exports.Registration = Registration;
//# sourceMappingURL=Registration.js.map
