import express from 'express';
import graphqlHTTP from 'express-graphql';
import { callBackend } from './node-fetch';
import { createSchema } from '../src';

const app = express();

const pathToSwaggerSchema = `https://petstore.swagger.io/v2`;

createSchema({
  swaggerSchema: pathToSwaggerSchema,
  callBackend,
})
  .then(schema => {
    app.use(
      '/graphql',
      graphqlHTTP(() => {
        return {
          schema,
          graphiql: true,
        };
      }),
    );

    app.listen(3009, 'localhost', () => {
      console.info('http://localhost:3009/graphql');
    });
  })
  .catch(e => {
    console.log(e);
  });
