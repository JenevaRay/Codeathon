import { createHttpLink } from '@apollo/client';

// this works for most
// 'http://localhost:3001/graphql'
// this works for me
// 'http://192.168.56.102:3001/graphql',
// it's temporary, when we deploy this will point to the API server.

const httpLink = createHttpLink({
  // uri: 'http://localhost:3001/graphql'
  // uri: '/graphql'
  uri: 'https://codeathon-server-a60585dbdc98.herokuapp.com/graphql',
});

export default httpLink;
