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
const eventIds = [
    new mongoose_1.default.Types.ObjectId(),
    new mongoose_1.default.Types.ObjectId(),
    new mongoose_1.default.Types.ObjectId(),
];
const groupIds = [
    new mongoose_1.default.Types.ObjectId(),
];
const registrationIds = [
    new mongoose_1.default.Types.ObjectId(),
    new mongoose_1.default.Types.ObjectId(),
];
const userIds = [
    new mongoose_1.default.Types.ObjectId(),
    new mongoose_1.default.Types.ObjectId(),
];
const venueIds = [
    new mongoose_1.default.Types.ObjectId(),
];
const users = [
    {
        _id: userIds[0],
        schemaVersion: index_1.schemaVersion,
        schemaDate: index_1.schemaDate.toDate(),
        emailAddress: 'davesmith@acme.net',
        password: '=^^=NoSuchPassword:3',
        nameLast: 'Smith',
        nameFirst: 'Dave',
        registrations: [registrationIds[0]],
    },
    {
        _id: userIds[1],
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
        registrations: [registrationIds[1]],
    },
];
const events = [
    {
        _id: eventIds[0],
        schemaVersion: index_1.schemaVersion,
        schemaDate: index_1.schemaDate.toDate(),
        name: 'Current Event No Registrations',
        dateStart: weekAgo.toDate(),
        dateEnd: nextWeek.toDate(),
        dateCutoff: now.toDate(),
        feeRegistration: 1299,
        feeVenue: 1000,
        organizerUserId: userIds[0],
        venues: [venueIds[0]],
        registrations: [],
        groups: [],
    },
    {
        _id: eventIds[1],
        schemaVersion: index_1.schemaVersion,
        schemaDate: index_1.schemaDate.toDate(),
        name: 'Past Event',
        dateStart: lastMonth.toDate(),
        dateEnd: lastMonth.toDate(),
        dateCutoff: lastMonth.toDate(),
        feeRegistration: 1299,
        feeVenue: 1000,
        organizerUserId: userIds[0],
        venues: [venueIds[0]],
        registrations: [registrationIds[0], registrationIds[1]],
        groups: [groupIds[0]],
    },
    {
        _id: eventIds[2],
        schemaVersion: index_1.schemaVersion,
        schemaDate: index_1.schemaDate.toDate(),
        name: 'Future Event',
        dateStart: nextMonth.toDate(),
        dateEnd: nextMonth.toDate(),
        dateCutoff: nextWeek.toDate(),
        feeRegistration: 1399,
        feeVenue: 1000,
        organizerUserId: userIds[0],
        venues: [venueIds[0]],
        registrations: [],
        groups: [groupIds[0]],
    },
];
const groups = [
    {
        _id: groupIds[0],
        schemaVersion: index_1.schemaVersion,
        schemaDate: index_1.schemaDate.toDate(),
        registrations: [registrationIds[0], registrationIds[1]],
        eventId: eventIds[0],
        name: 'Together Now',
        projectName: 'Full Schema Projector',
        projectDescription: 'Laid out to see',
    },
];
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
        events: [eventIds[0], eventIds[1], eventIds[2]],
    },
];
const registrations = [
    {
        _id: registrationIds[0],
        schemaVersion: index_1.schemaVersion,
        schemaDate: index_1.schemaDate,
        userId: userIds[0],
        eventId: eventIds[1],
        registrationDate: lastMonth.toDate(),
        registrationType: 'host',
        // hosts don't pay, or more technically pay $0
        paid: true,
    },
    {
        _id: registrationIds[1],
        schemaVersion: index_1.schemaVersion,
        schemaDate: index_1.schemaDate,
        userId: userIds[1],
        eventId: eventIds[1],
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