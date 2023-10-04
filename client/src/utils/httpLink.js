import { createHttpLink } from '@apollo/client';
import { remoteServer } from '../config/remote'

const httpLink = createHttpLink({
  // uri: 'http://localhost:3001/graphql'
  // uri: '/graphql'
  // uri: 'http://192.168.56.102:3001/graphql',
  uri: remoteServer + '/graphql',
});

export default httpLink;
