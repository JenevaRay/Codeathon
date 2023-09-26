import { useReducer } from 'react'

export const reducer = (state, action) => {

}

export function useEventReducer(initialState) {
    return useReducer(reducer, initialState)
}