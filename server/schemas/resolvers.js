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
exports.resolvers = void 0;
var apollo_server_express_1 = require("apollo-server-express");
var auth_1 = require("../utils/auth");
var models_1 = require("../models");
// import stripe from 'stripe'
// const Stripe = new stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc', {})
// import ObjectId from 'mongoose'
var resolvers = {
    Query: {
        users: function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.User.find()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        registrations: function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.Registration.find().populate({ path: 'eventId' })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        venues: function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.Venue.find()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        events: function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.Event.find()
                            .populate([
                            {
                                path: 'organizerUserId',
                                model: models_1.User
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
                        })
                            .populate({ path: 'groups', model: models_1.Group })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        groups: function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.Group.find().populate([
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
                        ])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
    },
    Mutation: {
        addUser: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
            var user, token, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, models_1.User.create(args)];
                    case 1:
                        user = _a.sent();
                        token = (0, auth_1.signToken)(user);
                        return [2 /*return*/, { token: token, user: user }];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [2 /*return*/, e_1];
                    case 3: return [2 /*return*/];
                }
            });
        }); },
        addRegistration: function (_, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var eventId, userId, type, paid, registration, registration, event_1, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        eventId = args.eventId;
                        userId = args.userId;
                        type = args.type;
                        paid = false;
                        if (type === 'host') {
                            // because they are not being charged for facilities/effort, their charge is $0.00
                            paid = true;
                        }
                        else if (type === undefined || type === null) {
                            type = 'attendee';
                        }
                        console.log(context);
                        if (!context.user) return [3 /*break*/, 1];
                        registration = new models_1.Registration({ eventId: eventId, userId: userId, type: type, paid: paid });
                        return [2 /*return*/, registration];
                    case 1: return [4 /*yield*/, models_1.Registration.create({
                            schemaVersion: models_1.schemaVersion,
                            schemaDate: models_1.schemaDate,
                            registrationDate: Date.now(),
                            registrationType: type,
                            eventId: eventId,
                            userId: userId,
                            paid: paid,
                        })];
                    case 2:
                        registration = _a.sent();
                        return [4 /*yield*/, models_1.Event.findByIdAndUpdate(eventId, {
                                $push: { registrations: registration._id },
                            }, { new: true })];
                    case 3:
                        event_1 = _a.sent();
                        console.log(event_1);
                        return [4 /*yield*/, models_1.User.findByIdAndUpdate(userId, {
                                $push: { registrations: registration._id }
                            })];
                    case 4:
                        user = _a.sent();
                        console.log(user);
                        if (event_1 && user && registration) {
                            return [2 /*return*/, registration];
                        }
                        else {
                            return [2 /*return*/, "ERROR"];
                        }
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); },
        // updateUser: async (parent, args, context) => {
        //   if (context.user) {
        //     return await User.findByIdAndUpdate(context.user._id, args, {new: true})
        //   }
        // },
        // updateRegistration: async (parent, { _id, quantity}) => {
        // },
        myEvents: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
            var organizerUserId, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        organizerUserId = args.organizerUserId;
                        return [4 /*yield*/, models_1.Event.find({ organizerUserId: organizerUserId })
                                .populate([
                                {
                                    path: 'organizerUserId',
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
                                populate: [
                                    // { path: 'addressId', model: Address },
                                    // { path: 'phoneId', model: Phone },
                                    { path: 'hostId', model: models_1.User },
                                ],
                            })
                                .populate({ path: 'groups', model: models_1.Group })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        }); },
        login: function (_, props) { return __awaiter(void 0, void 0, void 0, function () {
            var emailAddress, password, user, correctPw, simplifiedUser, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        emailAddress = props.emailAddress;
                        password = props.password;
                        return [4 /*yield*/, models_1.User.findOne({ emailAddress: emailAddress })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new apollo_server_express_1.AuthenticationError('Incorrect credentials');
                        }
                        return [4 /*yield*/, user.isCorrectPassword(password)];
                    case 2:
                        correctPw = _a.sent();
                        if (!correctPw) {
                            throw new apollo_server_express_1.AuthenticationError('Incorrect credentials');
                        }
                        simplifiedUser = {
                            _id: String(user._id),
                            emailAddress: user.emailAddress,
                            nameLast: user.nameLast,
                            nameFirst: user.nameFirst,
                        };
                        token = (0, auth_1.signToken)(simplifiedUser);
                        return [2 /*return*/, { token: token, user: user }];
                }
            });
        }); },
    },
};
exports.resolvers = resolvers;
