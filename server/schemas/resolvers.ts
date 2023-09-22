import { AuthenticationError } from "apollo-server-express";
import { Users, Registrations, Venue, Events, Groups, Projects } from '../models'
// import { signToken } from '../utils/auth'
import stripe from 'stripe'
// const Stripe = new stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc', {})

const resolvers = {

}

export { resolvers }