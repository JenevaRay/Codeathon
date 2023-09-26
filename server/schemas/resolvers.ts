// import { AuthenticationError } from "apollo-server-express";
import {
  User,
  Registration,
  Venue,
  Event,
  Group,
  Phone,
  Address,
} from '../models';
// import { signToken } from '../utils/auth'
// import stripe from 'stripe'
// const Stripe = new stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc', {})
import ObjectId from 'mongoose'

const resolvers = {
  Query: {
    // all users.  because easy proof of concept.
    users: async () => {
      const users = await User.find().populate([
        {
          path: 'addresses',
        },
      ]);
      return users;
    },
    registrations: async () => {
      return await Registration.find().populate({ path: 'eventId' });
    },
    venues: async () => {
      return await Venue.find().populate({ path: 'addressId' });
    },
    events: async () => {
      return await Event.find()
        .populate([
          {
            path: 'organizerUserId',
            populate: [
              {
                path: 'phoneNumbers',
                model: Phone,
              },
            ],
          },
        ])
        .populate({ path: 'registrations', model: Registration })
        .populate({
          path: 'venues',
          model: Venue,
          populate: [
            { path: 'addressId', model: Address },
            { path: 'phoneId', model: Phone },
            { path: 'hostId', model: User },
          ],
        })
        .populate({ path: 'groups', model: Group });
    },
    groups: async () => {
      return await Group.find().populate([
        {
          path: 'registrations',
          model: Registration,
          populate: [
            { path: 'eventId', model: Event },
            {
              path: 'userId',
              model: User,
              populate: { path: 'phoneNumbers', model: Phone },
            },
          ],
        },
      ]);
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user }
    },
    addRegistration: async (parent, { eventId: Schema.Types.ObjectId }, context) => {
      if (context.user) {
        const registration = new Registration({ eventId });
        await User.findByIdAndUpdate(context.user._id, { $push: { registrations: registration } })
      }
    }
  }
};

export { resolvers };
