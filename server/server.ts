import dotenv from 'dotenv';
dotenv.config();

import Express from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
// import { AuthMiddleware } from './utils/auth'

import { typeDefs, resolvers } from './schemas/index';
import { db } from './config/connection';
// import { DocumentNode } from 'graphql'

const PORT = process.env.PORT || 3001;
console.log(process.env)
const app = Express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: authMiddleware
});

app.use(Express.urlencoded({ extended: false }));
app.use(Express.json());

app.use('/images', Express.static(path.join(__dirname, '../client/images')));

if (process.env.NODE_ENV === 'production') {
  app.use(Express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at ${server.graphqlPath}`,
      );
    });
  });
};

startApolloServer();
