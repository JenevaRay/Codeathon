import { StoreProvider, useStoreContext } from './GlobalState';
import httpLink from './config';
import {
  QUERY_EVENTS,
  QUERY_REGISTRATIONS,
  QUERY_GROUPS,
  QUERY_VENUES,
  QUERY_USERS,
} from './queries';
import { useRegistrationReducer } from './reducers';
import AuthService from './auth';
import { LOGIN, ADD_REGISTRATION, MY_EVENTS } from './mutations';
import {
  svgPathVariant1,
  svgPathVariant2,
  firstVariant,
  secondVariant,
  thirdVariant,
  fourthVariant,
  fifthVariant,
  sixthVariant,
  seventhVariant,
} from './constants';
const Auth = AuthService;

export {
  StoreProvider,
  useStoreContext,
  useRegistrationReducer,
  QUERY_EVENTS,
  QUERY_REGISTRATIONS,
  QUERY_GROUPS,
  QUERY_VENUES,
  QUERY_USERS,
  ADD_REGISTRATION,
  MY_EVENTS,
  LOGIN,
  httpLink,
  Auth,
  svgPathVariant1,
  svgPathVariant2,
  firstVariant,
  secondVariant,
  thirdVariant,
  fourthVariant,
  fifthVariant,
  sixthVariant,
  seventhVariant,
};
