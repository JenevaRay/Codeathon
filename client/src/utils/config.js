import { createHttpLink } from '@apollo/client';

// this works for most
// 'http://localhost:3001/graphql'
// this works for me
// 'http://192.168.56.102:3001/graphql',
// it's temporary, when we deploy this will point to the API server.


const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

export default httpLink;
