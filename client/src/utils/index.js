import { StoreProvider, useStoreContext } from './GlobalState';
import httpLink from './config';
import {
  QUERY_EVENTS,
  QUERY_REGISTRATIONS,
  QUERY_GROUPS,
  QUERY_VENUES,
  QUERY_USERS,
} from './queries';
import { useEventReducer } from './reducers';
import AuthService from './auth';
import { LOGIN } from './mutations';

const Auth = AuthService;

export {
  StoreProvider,
  useStoreContext,
  useEventReducer,
  QUERY_EVENTS,
  QUERY_REGISTRATIONS,
  QUERY_GROUPS,
  QUERY_VENUES,
  QUERY_USERS,
  LOGIN,
  httpLink,
  Auth,
};
