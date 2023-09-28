import { useReducer } from 'react';
import { ADD_REGISTRATION } from './';

export const reducer = (state, action) => {
  console.log(action.type)
  switch (action.type) {
    case ADD_REGISTRATION:
        return {
            ...state,
            registrations: [...state.registrations, action.registered]
        }
      break
    default:
      return state;
  }
};

export function useRegistrationReducer(initialState) {
  return useReducer(reducer, initialState);
}
