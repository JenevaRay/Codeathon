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
exports.handlePayment = exports.schemaDate = exports.schemaVersion = exports.Group = exports.Event = exports.Registration = exports.Venue = exports.User = void 0;
// Import all models
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin
const User_1 = require("./User");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return User_1.User; } });
const Venue_1 = require("./Venue");
Object.defineProperty(exports, "Venue", { enumerable: true, get: function () { return Venue_1.Venue; } });
const Registration_1 = require("./Registration");
Object.defineProperty(exports, "Registration", { enumerable: true, get: function () { return Registration_1.Registration; } });
const Event_1 = require("./Event");
Object.defineProperty(exports, "Event", { enumerable: true, get: function () { return Event_1.Event; } });
const Group_1 = require("./Group");
Object.defineProperty(exports, "Group", { enumerable: true, get: function () { return Group_1.Group; } });
<<<<<<< HEAD
<<<<<<< HEAD
// import { Address } from './Address';
// import { Phone } from './Phone';
=======
>>>>>>> refs/remotes/origin/main
const dayjs_1 = __importDefault(require("dayjs"));
const stripe_1 = require("stripe"); // Import Stripe library
=======
const User_1 = require('./User');
Object.defineProperty(exports, 'User', {
  enumerable: true,
  get: function () {
    return User_1.User;
  },
});
const Venue_1 = require('./Venue');
Object.defineProperty(exports, 'Venue', {
  enumerable: true,
  get: function () {
    return Venue_1.Venue;
  },
});
const Registration_1 = require('./Registration');
Object.defineProperty(exports, 'Registration', {
  enumerable: true,
  get: function () {
    return Registration_1.Registration;
  },
});
const Event_1 = require('./Event');
Object.defineProperty(exports, 'Event', {
  enumerable: true,
  get: function () {
    return Event_1.Event;
  },
});
const Group_1 = require('./Group');
Object.defineProperty(exports, 'Group', {
  enumerable: true,
  get: function () {
    return Group_1.Group;
  },
});
const dayjs_1 = __importDefault(require('dayjs'));
const stripe_1 = require('stripe'); // Import Stripe library
>>>>>>> origin
=======
const dayjs_1 = __importDefault(require("dayjs"));
const stripe_1 = require("stripe"); // Import Stripe library
>>>>>>> origin
// Define a schema version and a schema date for future compatibility
const schemaVersion = '0.0.6';
exports.schemaVersion = schemaVersion;
const schemaDate = (0, dayjs_1.default)('2023-09-28');
exports.schemaDate = schemaDate;
const stripe = new stripe_1.Stripe('your-secret-key-here', {
    apiVersion: '2023-08-16',
});
function handlePayment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const paymentMethodId = req.body.paymentMethodId; // You should parse this from the request body
        try {
            // Create a payment intent to confirm the payment
            const paymentIntent = yield stripe.paymentIntents.create({
                amount: 1000,
                currency: 'usd',
                payment_method: paymentMethodId,
                confirm: true,
            });
            // Handle the payment intent status
            if (paymentIntent.status === 'succeeded') {
                // Payment succeeded, you can now fulfill the order
                console.log('Payment succeeded');
                res.status(200).json({ message: 'Payment succeeded' });
            }
            else {
                // Payment failed, handle the error
                console.error('Payment failed:', paymentIntent.last_payment_error);
                res.status(400).json({ error: 'Payment failed' });
            }
        }
        catch (error) {
            // Handle other errors (e.g., Stripe API errors)
            console.error('Error processing payment:', error);
            res.status(500).json({ error: 'Server error' });
        }
    });
}
exports.handlePayment = handlePayment;
//# sourceMappingURL=index.js.map