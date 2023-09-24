import { db } from './connection'

import { Event, schemaVer } from '../models'

const now: Date = new Date("September 24, 2023")
const lastMonth: Date = new Date("August 24, 2023")
const weekAgo: Date = new Date("September 17, 2023")
const nextWeek: Date = new Date("October 1, 2023")
const nextMonth: Date = new Date("October 24, 2023")

const events = [
    {
        schemaVersion: schemaVer,
        name: "EventNowNoRegistrations",
        startTime: weekAgo,
        endTime: nextWeek,
        registrations: [],
        registrationCutoffDate: now,
        registrationPaymentRequiredDate: now,
        organizerUserId: '000000111111'
    },
    {
        schemaVersion: schemaVer,
        name: "EventExpired",
        startTime: lastMonth,
        endTime: lastMonth,
        registrations: [],
        registrationCutoffDate: lastMonth,
        registrationPaymentRequiredDate: lastMonth,
        organizerUserId: '000000111111'
    },
    {
        schemaVersion: schemaVer,
        name: "EventFutureAcceptingRegistrations",
        startTime: nextMonth,
        endTime: nextMonth,
        registrations: [],
        registrationCutoffDate: nextWeek,
        registrationPaymentRequiredDate: nextMonth,
        organizerUserId: '000000111111'
    }
]


db.once('open', async()=>{
    await Event.deleteMany()
    const result = await Event.insertMany(events)
    console.log(result)
    console.log('Events seeded.')
    db.close()
})





