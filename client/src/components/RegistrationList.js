import React, { useEffect } from 'react'
// import Event from '../Event'
// import { useStoreContext } from '../utils/GlobalState'
// import { useStoreContext } from ''
import { useStoreContext, QUERY_REGISTRATIONS } from '../utils/'
import dayjs from 'dayjs'

import { useQuery } from '@apollo/client'

/*
*/

function RegistrationList() {
    const { loading, error, data } = useQuery(QUERY_REGISTRATIONS)
    const [state, dispatch] = useStoreContext()
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    const { currentEvent } = state
    
    console.log(data)
    const registrations = data.registrations.map((registration)=>(
        <div>
            <p>Event starting at {registration.eventId.dateStart} and ending at {registration.eventId.dateEnd}</p>
            <p>This registration is {registration.paid ? 'paid' : 'not paid'}</p>
            <p>You are {registration.role} for this event.</p>
        </div>
    ))
    return (<div>{registrations}</div>)

}

export { RegistrationList }
