import { useReducer } from 'react';

export const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export function useEventReducer(initialState) {
  return useReducer(reducer, initialState);
}
