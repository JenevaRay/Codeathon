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
import { LOGIN } from './mutations';
import { ADD_REGISTRATION } from './actions';

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
  LOGIN,
  httpLink,
  Auth,
};
