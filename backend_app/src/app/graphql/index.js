

const { makeExecutableSchema } = require('graphql-tools');
const { merge } = require('lodash');

const login = require('./schemas/login');
const register = require('./schemas/register');
const sharedTypes = require('./schemas/sharedTypes');
const getUserProfile = require('./schemas/getUserProfile');
const chatrooms = require('./schemas/chatrooms');
const chatroom = require('./schemas/chatroom');
const addChatroom = require('./schemas/addChatroom');

const newMessage = require('./schemas/newMessage');
const pushMessage = require('./schemas/pushMessage');

const rootSchema = `

  type Query {
    version: String!
  }

  type Mutation {
    version: String!
  }

  type Subscription {
    version: String!
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;

const rootResolvers = {
    Query: {
        version: () => require('../../../package.json').version, /* eslint global-require:0 */
    },
    Mutation: {      
        version: () => require('../../../package.json').version, /* eslint global-require:0 */
    },
    Subscription: {
        version: () => require('../../../package.json').version, /* eslint global-require:0 */
    },
};


const schema = makeExecutableSchema({
    typeDefs: [
        rootSchema,
        sharedTypes.sharedTypesTypeDef,
     

        register.registerTypeDef,
        login.loginTypeDef,
        getUserProfile.getUserProfileTypeDef,
        
        chatrooms.chatroomsTypeDef,
        chatroom.chatroomTypeDef,
        addChatroom.addChatroomTypeDef,
        
        newMessage.newMessageTypeDef,
        pushMessage.pushMessageTypeDef,


    ],
    resolvers: merge(
        rootResolvers,
        sharedTypes.sharedTypesResolvers,

        register.registerResolvers,
        login.loginResolvers,
        getUserProfile.getUserProfileResolvers,

        chatrooms.chatroomsResolvers,
        chatroom.chatroomResolvers,
        addChatroom.addChatroomResolvers,
      
        newMessage.newMessageResolvers,
        pushMessage.pushMessageResolvers,
    ),
});

module.exports = schema;
