import dayjs from 'dayjs';
import mongoose from 'mongoose';

import { db } from './connection';

import {
  User,
  Event,
  schemaVersion,
  schemaDate,
  Group,
  Venue,
  Registration,
} from '../models/index';

// Seed dynamic dates and times based upon the current date and time using Day.js
const now = dayjs();
const lastMonth = now.subtract(1, 'month');
const weekAgo = now.subtract(1, 'week');
const nextWeek = now.add(1, 'week');
const nextMonth = now.add(1, 'month');

const eventIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

const groupIds = [
  new mongoose.Types.ObjectId(),
]

const registrationIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

const venueIds = [
  new mongoose.Types.ObjectId(),
];

const users = [
  { // Seed a user with only the bare minimum fields
    _id: userIds[0],
    schemaVersion: schemaVersion,
    schemaDate: schemaDate.toDate(),
    emailAddress: 'davesmith@acme.net',
    password: '=^^=NoSuchPassword:3',
    nameLast: 'Smith',
    nameFirst: 'Dave',
    registrations: [registrationIds[0]],
  },
  { // Seed a user with all available fields
    _id: userIds[1],
    schemaVersion: schemaVersion,
    schemaDate: schemaDate.toDate(),
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
    schemaVersion: schemaVersion,
    schemaDate: schemaDate.toDate(),
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
    schemaVersion: schemaVersion,
    schemaDate: schemaDate.toDate(),
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
    schemaVersion: schemaVersion,
    schemaDate: schemaDate.toDate(),
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
    schemaVersion: schemaVersion,
    schemaDate: schemaDate.toDate(),
    registrations: [registrationIds[0], registrationIds[1]],
    eventId: eventIds[0],
    name: 'Together Now',
    projectName: 'Full Schema Projector',
    projectDescription: 'Laid out to see',
  },
];

const venues = [
  {  // Seed a venue with all available fields
    _id: venueIds[0],
    schemaVersion: schemaVersion,
    schemaDate: schemaDate.toDate(),
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
    schemaVersion: schemaVersion,
    schemaDate: schemaDate,
    userId: userIds[0],
    eventId: eventIds[1],
    registrationDate: lastMonth.toDate(),
    registrationType: 'host',
    // hosts don't pay, or more technically pay $0
    paid: true,
  },
  {
    _id: registrationIds[1],
    schemaVersion,
    schemaDate,
    userId: userIds[1],
    eventId: eventIds[1],
    registrationDate: lastMonth.toDate(),
    registrationType: 'attendee',
    paid: true,
  },
];

db.once('open', async () => {
  await User.deleteMany();
  for (const user of users) {
    // this method preserves the password encryption.
    await User.create(user);
  }
  console.log('Users seeded.');

  await Event.deleteMany();
  await Event.insertMany(events);
  console.log('Events seeded.');

  await Group.deleteMany();
  await Group.insertMany(groups);
  console.log('Groups seeded.');

  await Venue.deleteMany();
  await Venue.insertMany(venues);
  console.log('Venues seeded.');

  await Registration.deleteMany();
  await Registration.insertMany(registrations);
  console.log('Registrations seeded.');

  db.close();
});
