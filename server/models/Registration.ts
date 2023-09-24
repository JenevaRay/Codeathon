import mongoose, { Schema } from 'mongoose'
// import bcrypt from 'bcrypt'

import { schemaVer } from '.'

// either use this as an independent table, or use pared down versions of it as a subdocument table for both Users and Events...
// Feature: can add a paidTimeUTC - so that we know who paid when, useful for invoice lookups
// Feature: may need to add a paidAmount number/float.

const registrationSchema = new Schema({
    // implied: _id of type mongoose.ObjectId
    schemaVersion: {
        // this is to be used internally in case things change, let's hope they don't.
        type: String,
        required: true
    },
    // backreference is useful for building lists of users at an event
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    role: {
        // for Host, Attendee, and Volunteer
        type: String,
        trim: true,
        required: true,
    },
    // because revenue matters
    paid: {
        type: Boolean,
        required: true
    },
})

registrationSchema.pre('save', async function(next) {
    if (this.isNew) {
        this.schemaVersion = schemaVer
    }
    next()
})

const Registration = mongoose.model('Registration', registrationSchema)

export { Registration }