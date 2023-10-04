import { AuthenticationError } from 'apollo-server-express';
import { signToken } from '../utils/auth';

import {
  User,
  Registration,
  Venue,
  Event,
  Group,
  schemaVersion,
  schemaDate,
} from '../models';

const resolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },
    registrations: async () => {
      return await Registration.find().populate({ path: 'eventId' });
    },
    venues: async () => {
      return await Venue.find();
    },
    events: async () => {
      return await Event.find().populate([
        { path: 'organizerUserId', model: User },
        { path: 'registrations', model: Registration },
        { path: 'venues', model: Venue },
        { path: 'groups', model: Group },
      ]);
    },
    groups: async () => {
      return await Group.find().populate([
        {
          path: 'registrations',
          model: Registration,
          populate: [
            {
              path: 'eventId',
              model: Event,
            },
            {
              path: 'userId',
              model: User,
            },
          ],
        },
      ]);
    },
  },
  Mutation: {
    addEvent: async (_: any, args: any) => {
      try {
        let newEvent = await Event.create({ ...args, schemaVersion, schemaDate });
        return newEvent;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    addUser: async (_: any, args: any) => {
      try {
        const newUser = await User.create({ ...args, schemaVersion, schemaDate });
        const newToken = signToken(newUser);
        return { token: newToken, user: newUser };
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    addVenue: async (_: any, args: any) => {
      try {
        const newVenue = await Venue.create({...args, schemaVersion, schemaDate});
        return newVenue;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    payRegistrations: async (_: any, args: any) => {
      const registrationIds = args.registrationIds;
      const userId = args.userId;
      // const { registrations }: { string } = args
      for (const registrationId of registrationIds) {
        console.log(registrationId);
        const payments = Registration.findOneAndUpdate({
          _id: registrationId,
          paid: false,
        });
        console.log(payments);
      }
      console.log(registrationIds);
      console.log(userId);
      const updated = await Registration.find();
      console.log(updated);
      return updated;
    },
    addRegistration: async (_: any, args: any, context: any) => {
      const eventId = args.eventId;
      const userId = args.userId;
      let type = args.type;
      let paid = false;
      if (type === 'host') {
        // because they are not being charged for facilities/effort, their charge is $0.00
        paid = true;
      } else if (type === undefined || type === null) {
        type = 'attendee';
      }
      // console.log(context);
      if (context.user) {
        // const regist{ eventId, userId, type, paid })
        const registration = new Registration({ eventId, userId, type, paid });

        return registration;
      } else {
        const registration = await Registration.create({
          schemaVersion,
          schemaDate,
          registrationDate: Date.now(),
          registrationType: type,
          eventId,
          userId,
          paid,
        });
        // const event = await Event.findById(eventId)
        const event = await Event.findByIdAndUpdate(
          eventId,
          {
            $push: { registrations: registration._id },
          },
          { new: true },
        );
        // console.log(event);
        const user = await User.findByIdAndUpdate(userId, {
          $push: { registrations: registration._id },
        });
        // console.log(user);
        if (event && user && registration) {
          return registration;
        } else {
          return 'ERROR';
        }
      }
    },
    // updateUser: async (parent, args, context) => {
    //   if (context.user) {
    //     return await User.findByIdAndUpdate(context.user._id, args, {new: true})
    //   }
    // },
    // updateRegistration: async (parent, { _id, quantity}) => {

    // },
    myEvents: async (_: any, args: any) => {
      // console.log(args)
      const { organizerUserId } = args;
      const result = await Event.find({ organizerUserId })
        .populate([
          {
            path: 'organizerUserId',
            model: User,
            // populate: [
            //   {
            //     path: 'phoneNumbers',
            //     model: Phone,
            //   },
            // ],
          },
        ])
        .populate({ path: 'registrations', model: Registration })
        .populate({
          path: 'venues',
          model: Venue,
          // populate: [
          //   // { path: 'addressId', model: Address },
          //   // { path: 'phoneId', model: Phone },
          //   { path: 'hostId', model: User },
          // ],
        })
        .populate({ path: 'groups', model: Group });
      return result;
    },
    login: async (_: any, props: any) => {
      const emailAddress: string = props.emailAddress;
      const password: string = props.password;
      const user = await User.findOne({ emailAddress });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const simplifiedUser = {
        _id: String(user._id), // we are typecasting _id here.
        emailAddress: user.emailAddress,
        nameLast: user.nameLast,
        nameFirst: user.nameFirst,
      };

      const token = signToken(simplifiedUser);

      return { token, user };
    },
  },
};

const unresolvers = {
  payRegistrations: async (registrationIds: string[]) => {
    for (const registrationId of registrationIds) {
      await Registration.findOneAndUpdate(
        { _id: registrationId, paid: false },
        { paid: true },
      );
    }
    return true;
  },
};

export { resolvers, unresolvers };
