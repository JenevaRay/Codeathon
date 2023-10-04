import { createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  // uri: 'http://localhost:3001/graphql'
  // uri: '/graphql'
  uri: 'http://192.168.56.102:3001/graphql',
  // uri: 'https://codeathon-server-a60585dbdc98.herokuapp.com/graphql',
});

export default httpLink;
