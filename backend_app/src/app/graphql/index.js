const { makeExecutableSchema } = require('graphql-tools');
const { merge } = require('lodash');

const rootSchema = `

  type Query {
    version: String!
  }
  type Mutation {
    version: String!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

const rootResolvers = {

    Query: {
        version: () => require('../../../package.json').version, /* eslint global-require:0 */
    },
    Mutation: {      
        version: () => require('../../../package.json').version, /* eslint global-require:0 */
    },
  
};

const schema = makeExecutableSchema({
    typeDefs: [
        rootSchema,
    ],
    resolvers: merge(
        rootResolvers,
      
    ),
});

module.exports = schema;
