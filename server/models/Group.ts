import mongoose, { Schema } from 'mongoose'

import { schemaVer } from '.'

// either use this as an independent table, or use pared down versions of it as a subdocument table for both Users and Events...
// Feature: can add a paidTimeUTC - so that we know who paid when, useful for invoice lookups

const groupSchema = new Schema({
    // implied: _id of type mongoose.ObjectId
    schemaVersion: {
        // this is to be used internally in case things change, let's hope they don't.
        type: String,
        required: true
    },
    // backreference is useful for building lists of users at an event
    registrations: [
        {
            // kept in a separated table due to query atomicity
            type: Schema.Types.ObjectId,
            ref: 'Registration'
        }
    ],
    eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    project: {
        type: String,
        required: false
    }
})

groupSchema.pre('save', async function(next) {
    if (this.isNew) {
        this.schemaVersion = schemaVer
    }
    next()
})

const Group = mongoose.model('Group', groupSchema)

export { Group }