import { createSchema} from 'graphql-yoga';
import {userTypeDef, userResolvers} from './models/user.js';
import _ from 'lodash';
import {typeDef as Comment, resolvers as commentResolvers} from './models/comments.js';

const queries =  /* GraphQL */`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
      hello: () => 'Hello from yoga ',
    }
};

export const schema = createSchema({
    typeDefs: [queries, userTypeDef, Comment],
    resolvers: _.merge(resolvers, userResolvers, commentResolvers)
  });

