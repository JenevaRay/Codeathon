// TODO: import dayjs from 'dayjs'; for working with dates
// import mongoose from 'mongoose'
// const ObjectID = mongoose.Types.ObjectId

import { db } from './connection';

import {
  User,
  Event,
  schemaVersion,
  schemaDate,
  Group,
  Venue,
  Registration,
  Address,
  Phone,
} from '../models/index';

// TODO: Switch to dayjs objects to seed dynamic dates based upon the current date
const now: Date = new Date('September 24, 2023');
const lastMonth: Date = new Date('August 24, 2023');
const weekAgo: Date = new Date('September 17, 2023');
const nextWeek: Date = new Date('October 1, 2023');
const nextMonth: Date = new Date('October 24, 2023');

const events = [
  {
    _id: '999988887777',
    schemaVersion: schemaVersion,
    schemaDate: schemaDate.toDate(),
    name: 'EventNowNoRegistrations',
    dateStart: weekAgo,
    dateEnd: nextWeek,
    registrations: [],
    registrationCutoffDate: now,
    registrationPaymentRequiredDate: now,
    organizerUserId: '000000111111',
    feeRegistration: 1299,
    feeVenue: 1000,
    venues: ['555666555666'],
    groups: [],
  },
  {
    _id: '888877776666',
    schemaVersion: schemaVersion,
    schemaDate: schemaDate.toDate(),
    name: 'EventExpired',
    dateStart: lastMonth,
    dateEnd: lastMonth,
    registrations: ['012345012345', '987654987654'],
    registrationCutoffDate: lastMonth,
    registrationPaymentRequiredDate: lastMonth,
    organizerUserId: '000000111111',
    feeRegistration: 1299,
    feeVenue: 1000,
    venues: ['555666555666'],
    groups: ['554466554466'],
  },
  {
    _id: '777766665555',
    schemaVersion: schemaVersion,
    schemaDate: schemaDate.toDate(),
    name: 'EventFutureAcceptingRegistrations',
    dateStart: nextMonth,
    dateEnd: nextMonth,
    registrations: [],
    registrationCutoffDate: nextWeek,
    registrationPaymentRequiredDate: nextMonth,
    organizerUserId: '000000111111',
    feeRegistration: 1399,
    feeVenue: 1000,
    venues: ['555666555666'],
    groups: ['554466554466'],
  },
];

const users = [
  {
    _id: '000000111111',
    schemaVersion: schemaVersion,
    schemaDate: schemaDate.toDate(),
    nameFirst: 'Dave',
    nameLast: 'Smith',
    email: 'davesmith@acme.net',
    emailType: 'work',
    phoneNumbers: ['111112222233'],
    registrations: ['012345012345'],
    otherContactMethod: null,
    preferredContactMethod: 'email',
    password: '=^^=NoSuchPassword:3',
    addresses: ['224466224466'],
  },
  {
    _id: '222222333333',
    schemaVersion: schemaVersion,
    schemaDate: schemaDate.toDate(),
    registrations: ['987654987654'],
    firstName: 'First',
    lastName: 'Last',
    email: 'lastfirst@lifo.org',
    emailType: 'personal',
    phoneNumbers: ['222223333344'],
    otherContactMethod: null,
    preferredContactMethod: 'email',
    password: 'itsonthefridge',
    addresses: ['224466224466'],
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

const addresses = [
  {
    _id: '224466224466',
    schemaVersion: schemaVersion,
    schemaDate: schemaDate.toDate(),
    streetAddress: '123 Sesame Street',
    extendedAddress: undefined,
    country: 'US',
    state: 'New York',
    county: 'New York',
    city: 'Manhattan',
    postalCode: '12345',
    type: 'venue',
    isUserPrimary: false,
  },
];

const phones = [
  {
    schemaVersion: schemaVersion,
    schemaDate: schemaDate.toDate(),
    type: 'venue',
    _id: '111112222233',
    number: '+1 234-567-8901',
    isUserPrimary: false,
  },
  {
    schemaVersion: schemaVersion,
    schemaDate: schemaDate.toDate(),
    type: 'cell',
    _id: '222223333344',
    number: '+1 (234) 567-0001',
    isUserPrimary: true,
  },
];

const venues = [
  {
    _id: '555666555666',
    schemaVersion: schemaVersion,
    schemaDate: schemaDate.toDate(),
    addressId: '224466224466',
    name: "Elmo's House",
    phoneId: '111112222233',
    venueTimeZone: 'EST',
    hostId: '000000111111',
  },
];

const registrations = [
  {
    _id: '012345012345',
    schemaVersion: schemaVersion,
    schemaDate: schemaDate,
    userId: '000000111111',
    eventId: '888877776666',
    registrationDate: lastMonth,
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
    registrationDate: lastMonth,
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

  await Address.deleteMany();
  await Address.insertMany(addresses);
  console.log('Addresses seeded');

  await Phone.deleteMany();
  await Phone.insertMany(phones);
  console.log('Phones seeded');

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
