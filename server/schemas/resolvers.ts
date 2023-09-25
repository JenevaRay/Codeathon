// import { AuthenticationError } from "apollo-server-express";
import { User, Registration, Venue, Event, Group } from '../models'
// import { signToken } from '../utils/auth'
// import stripe from 'stripe'
// const Stripe = new stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc', {})

const resolvers = {
    Query: {
        // all users.  because easy proof of concept.
        users: async()=>{
            return await User.find()
        },
        registrations: async()=>{
            return await Registration.find()
        },
        venues: async()=>{
            return await Venue.find()
        },
        events: async()=>{
            return await Event.find()
        },
        groups: async()=>{
            return await Group.find()
        }
    }
}

export { resolvers }