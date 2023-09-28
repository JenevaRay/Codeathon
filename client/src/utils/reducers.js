import { useReducer } from 'react';
import { ADD_REGISTRATION } from './actions';

export const reducer = (state, action) => {
  console.log(action.type)
  switch (action.type) {
    case ADD_REGISTRATION:
      return {
        ...state,
        registrations: [...state.registrations, action.registered]
      }
    default:
      return state;
  }
};

export function useRegistrationReducer(initialState) {
  return useReducer(reducer, initialState);
}
