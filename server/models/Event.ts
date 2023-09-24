import mongoose, { Schema } from 'mongoose'

import { schemaVer } from '.'

// either use this as an independent table, or use pared down versions of it as a subdocument table for both Users and Events...
// Need to establish revenue tracking here.

const eventSchema = new Schema({
    // implied: _id of type mongoose.ObjectId
    schemaVersion: {
        // this is to be used internally in case things change, let's hope they don't.
        type: String,
        required: true
    },
    // backreference is useful for building lists of users at an event
    name: {
        type: String,
        index: true,
        required: false,
        unique: true,
        sparse: true
    },
    startTime: {
        // local to the venue's timezone
        type: Date,
        required: true,
    },
    endTime: {
        // local to the venue's timezone
        type: Date,
        required: true
    },
    registrations: [
        {
            // kept in a separated table due to query atomicity
            type: Schema.Types.ObjectId,
            ref: 'Registration'
        }
    ],
    registrationCutoffDate: {
        type: Date,
        required: true,
    },
    registrationPaymentRequiredDate: {
        type: Date,
        required: true,
    },
    organizerUserId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
})

eventSchema.pre('save', async function(next) {
    if (this.isNew) {
        this.schemaVersion = schemaVer
    }
    next()
})

const Event = mongoose.model('Event', eventSchema)

export { Event }