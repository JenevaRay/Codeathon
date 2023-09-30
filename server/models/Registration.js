"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Registration = void 0;
var mongoose_1 = require("mongoose");
// Import the overall schema version and schema date from the index.ts file
// import { schemaVersion, schemaDate } from './index';
// either use this as an independent table, or use pared down versions of it as a subdocument table for both Users and Events...
// Feature: can add a paidTimeUTC - so that we know who paid when, useful for invoice lookups
// Feature: may need to add a paidAmount number/float.
var registrationSchema = new mongoose_1.Schema({
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
var Registration = mongoose_1.default.model('Registration', registrationSchema);
exports.Registration = Registration;
