import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

import { schemaVer } from '.'

// import { Registration } from './Registration'

// possible features (definitely not MVP):
// internal messaging if no contact info?
// comments, like allergies, emergency contact info, admin reviews?

const userSchema = new Schema ({
    // implied: _id of type mongoose.ObjectId
    schemaVersion: {
        // this is to be used internally in case things change, let's hope they don't.
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        index: true,
        unique: true,
        // this allows for nullable unique identifiers
        sparse: true
    },
    phone: {
        // see npm: mongoose-intl-phone-number **future compatibility** 
        type: String,
        trim: true,
        index: true,
        // required: true,
        unique: true,
        // this allows for nullable unique identifiers
        sparse: true
    },
    otherContactMethod: {
        type: String,
        trim: true,
        index: true,
        unique: true,
        sparse: true
    },
    preferredContactMethod: {
        type: String,
        trim: true,
        // require at least one valid contact method from the user's profile.
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 12
    },
    registrations: [
        {
            // kept in a separated table due to query atomicity
            type: Schema.Types.ObjectId,
            ref: 'Registration'
        }
    ]
})

userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 20
        this.password = await bcrypt.hash(this.password, saltRounds)
    }
    if (this.isNew) {
        this.schemaVersion = schemaVer
    }
    next()
})

userSchema.methods.isCorrectPassword = async function(password: string) {
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)

export { User }