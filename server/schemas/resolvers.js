'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.unresolvers = exports.resolvers = void 0;
const apollo_server_express_1 = require('apollo-server-express');
const auth_1 = require('../utils/auth');
const models_1 = require('../models');
const resolvers = {
<<<<<<< HEAD
    Query: {
        users: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield models_1.User.find();
        }),
        registrations: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield models_1.Registration.find().populate({ path: 'eventId' });
        }),
        venues: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield models_1.Venue.find();
        }),
        events: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield models_1.Event.find().populate([
                { path: 'organizerUserId', model: models_1.User },
                { path: 'registrations', model: models_1.Registration },
                { path: 'venues', model: models_1.Venue },
                { path: 'groups', model: models_1.Group },
            ]);
        }),
        groups: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield models_1.Group.find().populate([
                {
                    path: 'registrations',
                    model: models_1.Registration,
                    populate: [
                        { path: 'eventId', model: models_1.Event },
                        {
                            path: 'userId',
                            model: models_1.User,
                            // populate: { path: 'phoneNumbers', model: Phone },
                        },
                    ],
                },
            ]);
        }),
    },
    Mutation: {
<<<<<<< HEAD
        // addEvent: async (_: any, args: any, context: any) => {
        // },
=======
        addEvent: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                console.log(args);
                let event = yield models_1.Event.create(Object.assign(Object.assign({}, args), { schemaVersion: models_1.schemaVersion, schemaDate: models_1.schemaDate }));
                return event;
            }
            catch (error) {
                console.error(error);
                return error;
            }
        }),
>>>>>>> refs/remotes/origin/main
        addUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield models_1.User.create(Object.assign(Object.assign({}, args), { schemaVersion: models_1.schemaVersion, schemaDate: models_1.schemaDate }));
                const token = (0, auth_1.signToken)(user);
                return { token, user };
            }
            catch (e) {
                console.log(e);
                return e;
            }
        }),
        addRegistration: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const eventId = args.eventId;
            const userId = args.userId;
            let type = args.type;
            let paid = false;
            if (type === 'host') {
                // because they are not being charged for facilities/effort, their charge is $0.00
                paid = true;
            }
            else if (type === undefined || type === null) {
                type = 'attendee';
            }
            console.log(context);
            if (context.user) {
                // const regist{ eventId, userId, type, paid })
                const registration = new models_1.Registration({ eventId, userId, type, paid });
                return registration;
            }
            else {
                const registration = yield models_1.Registration.create({
                    schemaVersion: models_1.schemaVersion,
                    schemaDate: models_1.schemaDate,
                    registrationDate: Date.now(),
                    registrationType: type,
                    eventId,
                    userId,
                    paid,
                });
                // const event = await Event.findById(eventId)
                const event = yield models_1.Event.findByIdAndUpdate(eventId, {
                    $push: { registrations: registration._id },
                }, { new: true });
                console.log(event);
                const user = yield models_1.User.findByIdAndUpdate(userId, {
                    $push: { registrations: registration._id },
                });
                console.log(user);
                if (event && user && registration) {
                    return registration;
                }
                else {
                    return 'ERROR';
                }
            }
        }),
        // updateUser: async (parent, args, context) => {
        //   if (context.user) {
        //     return await User.findByIdAndUpdate(context.user._id, args, {new: true})
        //   }
        // },
        // updateRegistration: async (parent, { _id, quantity}) => {
        // },
        myEvents: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            // console.log(args)
            const { organizerUserId } = args;
            const result = yield models_1.Event.find({ organizerUserId })
                .populate([
                {
                    path: 'organizerUserId',
<<<<<<< HEAD
=======
                    model: models_1.User,
>>>>>>> refs/remotes/origin/main
                    // populate: [
                    //   {
                    //     path: 'phoneNumbers',
                    //     model: Phone,
                    //   },
                    // ],
                },
            ])
                .populate({ path: 'registrations', model: models_1.Registration })
                .populate({
                path: 'venues',
                model: models_1.Venue,
                // populate: [
                //   // { path: 'addressId', model: Address },
                //   // { path: 'phoneId', model: Phone },
                //   { path: 'hostId', model: User },
                // ],
            })
                .populate({ path: 'groups', model: models_1.Group });
            return result;
        }),
        login: (_, props) => __awaiter(void 0, void 0, void 0, function* () {
            const emailAddress = props.emailAddress;
            const password = props.password;
            const user = yield models_1.User.findOne({ emailAddress });
            if (!user) {
                throw new apollo_server_express_1.AuthenticationError('Incorrect credentials');
            }
            const correctPw = yield user.isCorrectPassword(password);
            if (!correctPw) {
                throw new apollo_server_express_1.AuthenticationError('Incorrect credentials');
            }
            const simplifiedUser = {
                _id: String(user._id),
                emailAddress: user.emailAddress,
                nameLast: user.nameLast,
                nameFirst: user.nameFirst,
            };
            const token = (0, auth_1.signToken)(simplifiedUser);
            return { token, user };
        }),
    },
=======
  Query: {
    users: () =>
      __awaiter(void 0, void 0, void 0, function* () {
        return yield models_1.User.find();
      }),
    registrations: () =>
      __awaiter(void 0, void 0, void 0, function* () {
        return yield models_1.Registration.find().populate({ path: 'eventId' });
      }),
    venues: () =>
      __awaiter(void 0, void 0, void 0, function* () {
        return yield models_1.Venue.find();
      }),
    events: () =>
      __awaiter(void 0, void 0, void 0, function* () {
        return yield models_1.Event.find().populate([
          { path: 'organizerUserId', model: models_1.User },
          { path: 'registrations', model: models_1.Registration },
          { path: 'venues', model: models_1.Venue },
          { path: 'groups', model: models_1.Group },
        ]);
      }),
    groups: () =>
      __awaiter(void 0, void 0, void 0, function* () {
        return yield models_1.Group.find().populate([
          {
            path: 'registrations',
            model: models_1.Registration,
            populate: [
              { path: 'eventId', model: models_1.Event },
              {
                path: 'userId',
                model: models_1.User,
                // populate: { path: 'phoneNumbers', model: Phone },
              },
            ],
          },
        ]);
      }),
  },
  Mutation: {
    addEvent: (_, args) =>
      __awaiter(void 0, void 0, void 0, function* () {
        try {
          // console.log(args);
          let event = yield models_1.Event.create(
            Object.assign(Object.assign({}, args), {
              schemaVersion: models_1.schemaVersion,
              schemaDate: models_1.schemaDate,
            }),
          );
          return event;
        } catch (error) {
          // console.error(error);
          return error;
        }
      }),
    addUser: (_, args) =>
      __awaiter(void 0, void 0, void 0, function* () {
        try {
          const user = yield models_1.User.create(
            Object.assign(Object.assign({}, args), {
              schemaVersion: models_1.schemaVersion,
              schemaDate: models_1.schemaDate,
            }),
          );
          const token = (0, auth_1.signToken)(user);
          return { token, user };
        } catch (e) {
          console.log(e);
          return e;
        }
      }),
    payRegistrations: (_, args) =>
      __awaiter(void 0, void 0, void 0, function* () {
        const registrationIds = args.registrationIds;
        const userId = args.userId;
        // const { registrations }: { string } = args
        for (const registrationId of registrationIds) {
          console.log(registrationId);
          const payments = models_1.Registration.findOneAndUpdate({
            _id: registrationId,
            paid: false,
          });
          console.log(payments);
        }
        console.log(registrationIds);
        console.log(userId);
        const updated = yield models_1.Registration.find();
        console.log(updated);
        return updated;
      }),
    addRegistration: (_, args, context) =>
      __awaiter(void 0, void 0, void 0, function* () {
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
          const registration = new models_1.Registration({
            eventId,
            userId,
            type,
            paid,
          });
          return registration;
        } else {
          const registration = yield models_1.Registration.create({
            schemaVersion: models_1.schemaVersion,
            schemaDate: models_1.schemaDate,
            registrationDate: Date.now(),
            registrationType: type,
            eventId,
            userId,
            paid,
          });
          // const event = await Event.findById(eventId)
          const event = yield models_1.Event.findByIdAndUpdate(
            eventId,
            {
              $push: { registrations: registration._id },
            },
            { new: true },
          );
          // console.log(event);
          const user = yield models_1.User.findByIdAndUpdate(userId, {
            $push: { registrations: registration._id },
          });
          // console.log(user);
          if (event && user && registration) {
            return registration;
          } else {
            return 'ERROR';
          }
        }
      }),
    // updateUser: async (parent, args, context) => {
    //   if (context.user) {
    //     return await User.findByIdAndUpdate(context.user._id, args, {new: true})
    //   }
    // },
    // updateRegistration: async (parent, { _id, quantity}) => {
    // },
    myEvents: (_, args) =>
      __awaiter(void 0, void 0, void 0, function* () {
        // console.log(args)
        const { organizerUserId } = args;
        const result = yield models_1.Event.find({ organizerUserId })
          .populate([
            {
              path: 'organizerUserId',
              model: models_1.User,
              // populate: [
              //   {
              //     path: 'phoneNumbers',
              //     model: Phone,
              //   },
              // ],
            },
          ])
          .populate({ path: 'registrations', model: models_1.Registration })
          .populate({
            path: 'venues',
            model: models_1.Venue,
            // populate: [
            //   // { path: 'addressId', model: Address },
            //   // { path: 'phoneId', model: Phone },
            //   { path: 'hostId', model: User },
            // ],
          })
          .populate({ path: 'groups', model: models_1.Group });
        return result;
      }),
    login: (_, props) =>
      __awaiter(void 0, void 0, void 0, function* () {
        const emailAddress = props.emailAddress;
        const password = props.password;
        const user = yield models_1.User.findOne({ emailAddress });
        if (!user) {
          throw new apollo_server_express_1.AuthenticationError(
            'Incorrect credentials',
          );
        }
        const correctPw = yield user.isCorrectPassword(password);
        if (!correctPw) {
          throw new apollo_server_express_1.AuthenticationError(
            'Incorrect credentials',
          );
        }
        const simplifiedUser = {
          _id: String(user._id),
          emailAddress: user.emailAddress,
          nameLast: user.nameLast,
          nameFirst: user.nameFirst,
        };
        const token = (0, auth_1.signToken)(simplifiedUser);
        return { token, user };
      }),
  },
>>>>>>> origin
};
exports.resolvers = resolvers;
const unresolvers = {
  payRegistrations: (registrationIds) =>
    __awaiter(void 0, void 0, void 0, function* () {
      for (const registrationId of registrationIds) {
        yield models_1.Registration.findOneAndUpdate(
          { _id: registrationId, paid: false },
          { paid: true },
        );
      }
      return true;
    }),
};
exports.unresolvers = unresolvers;
//# sourceMappingURL=resolvers.js.map
