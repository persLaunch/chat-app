
import pubsub from '../subscriptions';


const newMessageTypeDef = `
  extend type Subscription { 
    newMessage: Message 
  }
`;

const newMessageResolvers = {
    Subscription: {
        newMessage: {
            subscribe: () => pubsub.asyncIterator('newMessage'),
        },
    },
};

module.exports = {
    newMessageTypeDef,
    newMessageResolvers,
};
