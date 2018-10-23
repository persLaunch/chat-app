import pubsub from '../subscriptions';

const newMessageAddedTypeDef = `
extend type Subscription {
    newMessageAdded(chatroomId: String!): Message
  }
`;

const newMessageAddedResolvers = {

    Subscription: {
        
        newMessageAdded: () => pubsub.asyncIterator('newMessageAdded'),
    },
};

module.exports = {

    newMessageAddedResolvers,
    newMessageAddedTypeDef,
};
