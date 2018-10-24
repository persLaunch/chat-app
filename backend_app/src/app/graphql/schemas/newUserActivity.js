
import { withFilter } from 'graphql-subscriptions';
import pubsub from '../subscriptions';


const newUserActivityTypeDef = `
  extend type Subscription { 
    newUserActivity(chatroomId: ID): UserActivity 
  }
`;

const newUserActivityResolvers = {
    Subscription: {
        newUserActivity: {
            subscribe: withFilter(() => pubsub.asyncIterator('newUserActivity'),
                (payload, args) => {
                  
                    return payload.newUserActivity.chatroomId === parseInt(args.chatroomId, 10);
                }),
        },
    },
};

module.exports = {
    newUserActivityTypeDef,
    newUserActivityResolvers,
};
