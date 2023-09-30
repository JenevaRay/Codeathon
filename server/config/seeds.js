"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var dayjs_1 = require("dayjs");
var mongoose_1 = require("mongoose");
var connection_1 = require("./connection");
var index_1 = require("../models/index");
// Seed dynamic dates and times based upon the current date and time using Day.js
var now = (0, dayjs_1.default)();
var lastMonth = now.subtract(1, 'month');
var weekAgo = now.subtract(1, 'week');
var nextWeek = now.add(1, 'week');
var nextMonth = now.add(1, 'month');
var usersIds = [
    new mongoose_1.default.Types.ObjectId(),
    new mongoose_1.default.Types.ObjectId(),
];
var venueIds = [
    new mongoose_1.default.Types.ObjectId(),
];
var users = [
    {
        _id: usersIds[0],
        schemaVersion: index_1.schemaVersion,
        schemaDate: index_1.schemaDate.toDate(),
        emailAddress: 'davesmith@acme.net',
        password: '=^^=NoSuchPassword:3',
        nameLast: 'Smith',
        nameFirst: 'Dave',
        registrations: ['012345012345'],
    },
    {
        _id: usersIds[1],
        schemaVersion: index_1.schemaVersion,
        schemaDate: index_1.schemaDate.toDate(),
        emailAddress: 'lastfirst@lifo.org',
        password: 'itsonthefridge',
        nameLast: 'Last',
        nameFirst: 'First',
        nameMiddle: 'Middle',
        addressStreet: '123 Sesame Street',
        addressExtended: 'Apt 1',
        addressCity: 'Manhattan',
        addressState: 'New York',
        addressPostalCode: '12345',
        addressCountry: 'United States',
        phoneNumber: '+1 (234) 567-8910',
        phoneType: 'mobile',
        registrations: ['987654987654'],
    },
];
var events = [
    {
        _id: '999988887777',
        schemaVersion: index_1.schemaVersion,
        schemaDate: index_1.schemaDate.toDate(),
        name: 'EventNowNoRegistrations',
        dateStart: weekAgo.toDate(),
        dateEnd: nextWeek.toDate(),
        registrations: [],
        registrationCutoffDate: now.toDate(),
        registrationPaymentRequiredDate: now.toDate(),
        organizerUserId: usersIds[0],
        feeRegistration: 1299,
        feeVenue: 1000,
        venues: [venueIds[0]],
        groups: [],
    },
    {
        _id: '888877776666',
        schemaVersion: index_1.schemaVersion,
        schemaDate: index_1.schemaDate.toDate(),
        name: 'EventExpired',
        dateStart: lastMonth.toDate(),
        dateEnd: lastMonth.toDate(),
        registrations: ['012345012345', '987654987654'],
        registrationCutoffDate: lastMonth.toDate(),
        registrationPaymentRequiredDate: lastMonth.toDate(),
        organizerUserId: usersIds[0],
        feeRegistration: 1299,
        feeVenue: 1000,
        venues: [venueIds[0]],
        groups: ['554466554466'],
    },
    {
        _id: '777766665555',
        schemaVersion: index_1.schemaVersion,
        schemaDate: index_1.schemaDate.toDate(),
        name: 'EventFutureAcceptingRegistrations',
        dateStart: nextMonth.toDate(),
        dateEnd: nextMonth.toDate(),
        registrations: [],
        registrationCutoffDate: nextWeek.toDate(),
        registrationPaymentRequiredDate: nextMonth.toDate(),
        organizerUserId: usersIds[0],
        feeRegistration: 1399,
        feeVenue: 1000,
        venues: [venueIds[0]],
        groups: ['554466554466'],
    },
];
var groups = [
    {
        _id: '554466554466',
        schemaVersion: index_1.schemaVersion,
        schemaDate: index_1.schemaDate.toDate(),
        registrations: ['012345012345', '987654987654'],
        eventId: '999988887777',
        name: 'Together Now',
        projectName: 'Full Schema Projector',
        projectDescription: 'Laid out to see',
    },
];
// const addresses = [
//   {
//     _id: '224466224466',
//     schemaVersion: schemaVersion,
//     schemaDate: schemaDate.toDate(),
//     streetAddress: '123 Sesame Street',
//     extendedAddress: undefined,
//     country: 'US',
//     state: 'New York',
//     county: 'New York',
//     city: 'Manhattan',
//     postalCode: '12345',
//     type: 'venue',
//     isUserPrimary: false,
//   },
// ];
// const phones = [
//   {
//     schemaVersion: schemaVersion,
//     schemaDate: schemaDate.toDate(),
//     type: 'venue',
//     _id: '111112222233',
//     number: '+1 234-567-8901',
//     isUserPrimary: false,
//   },
//   {
//     schemaVersion: schemaVersion,
//     schemaDate: schemaDate.toDate(),
//     type: 'cell',
//     _id: '222223333344',
//     number: '+1 (234) 567-0001',
//     isUserPrimary: true,
//   },
// ];
var venues = [
    {
        _id: venueIds[0],
        schemaVersion: index_1.schemaVersion,
        schemaDate: index_1.schemaDate.toDate(),
        name: "Elmo's House",
        addressStreet: '123 Sesame Street',
        addressExtended: 'Apt 1',
        addressCity: 'Manhattan',
        addressState: 'New York',
        addressPostalCode: '12345',
        addressCountry: 'United States',
        phoneNumber: '+1 (234) 567-8910',
        events: ['000000111111'],
    },
];
var registrations = [
    {
        _id: '012345012345',
        schemaVersion: index_1.schemaVersion,
        schemaDate: index_1.schemaDate,
        userId: usersIds[0],
        eventId: '888877776666',
        registrationDate: lastMonth.toDate(),
        registrationType: 'host',
        // hosts don't pay, or more technically pay $0
        paid: true,
    },
    {
        _id: '987654987654',
        schemaVersion: index_1.schemaVersion,
        schemaDate: index_1.schemaDate,
        userId: '222222333333',
        eventId: '888877776666',
        registrationDate: lastMonth.toDate(),
        registrationType: 'attendee',
        paid: true,
    },
];
connection_1.db.once('open', function () { return __awaiter(void 0, void 0, void 0, function () {
    var _i, users_1, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.User.deleteMany()];
            case 1:
                _a.sent();
                _i = 0, users_1 = users;
                _a.label = 2;
            case 2:
                if (!(_i < users_1.length)) return [3 /*break*/, 5];
                user = users_1[_i];
                // this method preserves the password encryption.
                return [4 /*yield*/, index_1.User.create(user)];
            case 3:
                // this method preserves the password encryption.
                _a.sent();
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                console.log('Users seeded.');
                return [4 /*yield*/, index_1.Event.deleteMany()];
            case 6:
                _a.sent();
                return [4 /*yield*/, index_1.Event.insertMany(events)];
            case 7:
                _a.sent();
                console.log('Events seeded.');
                // await Address.deleteMany();
                // await Address.insertMany(addresses);
                // console.log('Addresses seeded');
                // await Phone.deleteMany();
                // await Phone.insertMany(phones);
                // console.log('Phones seeded');
                return [4 /*yield*/, index_1.Group.deleteMany()];
            case 8:
                // await Address.deleteMany();
                // await Address.insertMany(addresses);
                // console.log('Addresses seeded');
                // await Phone.deleteMany();
                // await Phone.insertMany(phones);
                // console.log('Phones seeded');
                _a.sent();
                return [4 /*yield*/, index_1.Group.insertMany(groups)];
            case 9:
                _a.sent();
                console.log('Groups seeded.');
                return [4 /*yield*/, index_1.Venue.deleteMany()];
            case 10:
                _a.sent();
                return [4 /*yield*/, index_1.Venue.insertMany(venues)];
            case 11:
                _a.sent();
                console.log('Venues seeded.');
                return [4 /*yield*/, index_1.Registration.deleteMany()];
            case 12:
                _a.sent();
                return [4 /*yield*/, index_1.Registration.insertMany(registrations)];
            case 13:
                _a.sent();
                console.log('Registrations seeded.');
                connection_1.db.close();
                return [2 /*return*/];
        }
    });
}); });
