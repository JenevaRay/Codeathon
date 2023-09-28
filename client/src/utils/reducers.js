import { useReducer } from 'react';
import { ADD_REGISTRATION_TO_CART } from './actions';

export const reducer = (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case ADD_REGISTRATION_TO_CART:
      return {
        ...state,
        registrations: [...state.registrations, action.registered],
      };
    default:
      return state;
  }
};

export function useRegistrationReducer(initialState) {
  return useReducer(reducer, initialState);
}
