"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaDate = exports.schemaVersion = exports.Group = exports.Event = exports.Registration = exports.Venue = exports.User = void 0;
// Import all models
const User_1 = require("./User");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return User_1.User; } });
const Venue_1 = require("./Venue");
Object.defineProperty(exports, "Venue", { enumerable: true, get: function () { return Venue_1.Venue; } });
const Registration_1 = require("./Registration");
Object.defineProperty(exports, "Registration", { enumerable: true, get: function () { return Registration_1.Registration; } });
const Event_1 = require("./Event");
Object.defineProperty(exports, "Event", { enumerable: true, get: function () { return Event_1.Event; } });
const Group_1 = require("./Group");
Object.defineProperty(exports, "Group", { enumerable: true, get: function () { return Group_1.Group; } });
// import { Address } from './Address';
// import { Phone } from './Phone';
const dayjs_1 = __importDefault(require("dayjs"));
// Define a schema version and a schema date for future compatibility
const schemaVersion = '0.0.6';
exports.schemaVersion = schemaVersion;
const schemaDate = (0, dayjs_1.default)('2023-09-28');
exports.schemaDate = schemaDate;
//# sourceMappingURL=index.js.map