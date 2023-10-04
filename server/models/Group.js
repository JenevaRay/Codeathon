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
exports.Group = void 0;
const mongoose_1 = __importStar(require('mongoose'));
// Import the overall schema version and schema date from the index.ts file
const index_1 = require('./index');
// either use this as an independent table, or use pared down versions of it as a subdocument table for both Users and Events...
// Feature: can add a paidTimeUTC - so that we know who paid when, useful for invoice lookups
const groupSchema = new mongoose_1.Schema({
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
  registrations: [
    {
      // kept in a separated table due to query atomicity
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'Registration',
    },
  ],
  events: [
    {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
  ],
  name: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: false,
  },
  projectDescription: {
    type: String,
    required: false,
  },
});
groupSchema.pre('save', function (next) {
  return __awaiter(this, void 0, void 0, function* () {
    if (this.isNew) {
      this.schemaVersion = index_1.schemaVersion;
      this.schemaDate = index_1.schemaDate.toDate();
    }
    next();
  });
});
const Group = mongoose_1.default.model('Group', groupSchema);
exports.Group = Group;
//# sourceMappingURL=Group.js.map
