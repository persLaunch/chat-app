const { makeExecutableSchema } = require('graphql-tools');
const { merge } = require('lodash');


const login = require('./schemas/login');
const register = require('./schemas/register');
const getUserProfile = require('./schemas/getUserProfile');

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

        register.registerTypeDef,
        login.loginTypeDef,
        getUserProfile.getUserProfileTypeDef,
        
    ],
    resolvers: merge(
        rootResolvers,
      
        register.registerResolvers,
        login.loginResolvers,
        getUserProfile.getUserProfileResolvers,
    ),
});

module.exports = schema;
