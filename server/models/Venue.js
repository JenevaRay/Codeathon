"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Venue = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Import the overall schema version and schema date from the index.ts file
const index_1 = require("./index");
// possible features (definitely not MVP):
// corporate correspondence address?  legally a good idea...
// venue address notes (i.e. do not park at Bob's Diner)
// venue latitude/longitude, for regional searches, can be easily entered via map click...
const venueSchema = new mongoose_1.Schema({
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
    website: {
        type: String,
        trim: true,
    },
    events: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            index: true,
            ref: 'Event',
        },
    ],
});
venueSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isNew) {
            this.schemaVersion = index_1.schemaVersion;
            this.schemaDate = index_1.schemaDate.toDate();
        }
        next();
    });
});
const Venue = mongoose_1.default.model('Venue', venueSchema);
exports.Venue = Venue;
//# sourceMappingURL=Venue.js.map