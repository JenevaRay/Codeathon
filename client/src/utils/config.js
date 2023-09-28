import { createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://192.168.56.102:3001/graphql',
});

export default httpLink;
