import { useReducer } from 'react';
import { ADD_REGISTRATION_TO_CART, REMOVE_REGISTRATION_FROM_CART } from './actions';

export const registrationReducer = (state, action) => {
  switch (action.type) {
    case ADD_REGISTRATION_TO_CART:
      console.log(ADD_REGISTRATION_TO_CART)
      return {
        ...state,
        registrations: [...state.registrations, action.registered],
      };
    case REMOVE_REGISTRATION_FROM_CART:
      console.log(REMOVE_REGISTRATION_FROM_CART)
      const registrationIndex = state.registrations.findIndex((registration) => registration._id === action.payload)
      return { 
        ...state,
        registrations: state.registrations.splice(registrationIndex, 1)
        // registrations: state.registrations.filter((registrationId)=>{registrationId != action.payload})
      }
    default:
      console.log(state)
      return state;
  }
};

export function useRegistrationReducer(initialState) {
  return useReducer(registrationReducer, initialState);
}
