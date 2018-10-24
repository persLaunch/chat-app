
import { withFilter } from 'graphql-subscriptions';
import pubsub from '../subscriptions';


const newMessageTypeDef = `
  extend type Subscription { 
    newMessage(chatroomId: ID): Message 
  }
`;

const newMessageResolvers = {
    Subscription: {
        newMessage: {
            subscribe: withFilter(() => pubsub.asyncIterator('newMessage'),
                (payload, args) => {
                  
                    return payload.newMessage.chatroomId === parseInt(args.chatroomId, 10);
                }),
        },
    },
};

module.exports = {
    newMessageTypeDef,
    newMessageResolvers,
};
