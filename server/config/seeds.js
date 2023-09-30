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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const mongoose_1 = __importDefault(require("mongoose"));
const connection_1 = require("./connection");
const index_1 = require("../models/index");
// Seed dynamic dates and times based upon the current date and time using Day.js
const now = (0, dayjs_1.default)();
const lastMonth = now.subtract(1, 'month');
const weekAgo = now.subtract(1, 'week');
const nextWeek = now.add(1, 'week');
const nextMonth = now.add(1, 'month');
const usersIds = [
    new mongoose_1.default.Types.ObjectId(),
    new mongoose_1.default.Types.ObjectId(),
];
const venueIds = [
    new mongoose_1.default.Types.ObjectId(),
];
const users = [
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
const events = [
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
const groups = [
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
const venues = [
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
const registrations = [
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
connection_1.db.once('open', () => __awaiter(void 0, void 0, void 0, function* () {
    yield index_1.User.deleteMany();
    for (const user of users) {
        // this method preserves the password encryption.
        yield index_1.User.create(user);
    }
    console.log('Users seeded.');
    yield index_1.Event.deleteMany();
    yield index_1.Event.insertMany(events);
    console.log('Events seeded.');
    // await Address.deleteMany();
    // await Address.insertMany(addresses);
    // console.log('Addresses seeded');
    // await Phone.deleteMany();
    // await Phone.insertMany(phones);
    // console.log('Phones seeded');
    yield index_1.Group.deleteMany();
    yield index_1.Group.insertMany(groups);
    console.log('Groups seeded.');
    yield index_1.Venue.deleteMany();
    yield index_1.Venue.insertMany(venues);
    console.log('Venues seeded.');
    yield index_1.Registration.deleteMany();
    yield index_1.Registration.insertMany(registrations);
    console.log('Registrations seeded.');
    connection_1.db.close();
}));
//# sourceMappingURL=seeds.js.map