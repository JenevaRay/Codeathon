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
  // Address,
  // Phone,
} from '../models/index';

// Seed dynamic dates and times based upon the current date and time using Day.js
const now = dayjs();
const lastMonth = now.subtract(1, 'month');
const weekAgo = now.subtract(1, 'week');
const nextWeek = now.add(1, 'week');
const nextMonth = now.add(1, 'month');

const usersIds = [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()];

const venueIds = [new mongoose.Types.ObjectId()];

const users = [
  {
    // Seed a user with only the bare minimum fields
    _id: usersIds[0],
    schemaVersion: schemaVersion,
    schemaDate: schemaDate.toDate(),
    emailAddress: 'davesmith@acme.net',
    password: '=^^=NoSuchPassword:3',
    nameLast: 'Smith',
    nameFirst: 'Dave',
    registrations: ['012345012345'],
  },
  {
    // Seed a user with all available fields
    _id: usersIds[1],
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
    registrations: ['987654987654'],
  },
];

const events = [
  {
    _id: '999988887777',
    schemaVersion: schemaVersion,
    schemaDate: schemaDate.toDate(),
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
    schemaVersion: schemaVersion,
    schemaDate: schemaDate.toDate(),
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
    schemaVersion: schemaVersion,
    schemaDate: schemaDate.toDate(),
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
    schemaVersion: schemaVersion,
    schemaDate: schemaDate.toDate(),
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
    // Seed a venue with all available fields
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
    events: ['000000111111'],
  },
];

const registrations = [
  {
    _id: '012345012345',
    schemaVersion: schemaVersion,
    schemaDate: schemaDate,
    userId: usersIds[0],
    eventId: '888877776666',
    registrationDate: lastMonth.toDate(),
    registrationType: 'host',
    // hosts don't pay, or more technically pay $0
    paid: true,
  },
  {
    _id: '987654987654',
    schemaVersion,
    schemaDate,
    userId: '222222333333',
    eventId: '888877776666',
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

  // await Address.deleteMany();
  // await Address.insertMany(addresses);
  // console.log('Addresses seeded');

  // await Phone.deleteMany();
  // await Phone.insertMany(phones);
  // console.log('Phones seeded');

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
