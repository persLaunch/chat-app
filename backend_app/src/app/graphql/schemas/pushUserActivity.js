import pubsub from '../subscriptions';

const { Message } = require('../../models');

const s_auth = require('../services/s_auth');
const s_user = require('../services/s_user');


const pushUserActivityTypeDef = `
  extend type Mutation { 
    pushUserActivity(status: String!, chatroomId: String!): UserActivity
  }
`;

const pushUserActivityResolvers = {
    Mutation: {
        pushUserActivity: async (_, { status, chatroomId }, req) => {
           
            if (s_auth.isAuth(req)) { 

                const { userId } = req.auth;

                const user = await s_user.getUserProfile(userId);

                const userActivity = {
                    status,
                    user,
                    chatroomId,
                    createdAt: new Date().getTime(),
                };

                try {
                   
                    pubsub.publish('newUserActivity', { newUserActivity: userActivity });
                    
                    return userActivity;

                } catch (err) {

                    console.log(err);
                    throw new Error('Error on message creation');
                }
            }

            throw new Error('Not authenticated');

        },

    },
};

module.exports = {
    pushUserActivityTypeDef,
    pushUserActivityResolvers,
};
