import pubsub from '../subscriptions';

const { Message } = require('../../models');

const s_auth = require('../services/s_auth');
const s_user = require('../services/s_user');


const pushMessageTypeDef = `
  extend type Mutation { 
    pushMessage(text: String!, chatroomId: String!): Message 
  }
`;

const pushMessageResolvers = {
    Mutation: {
        pushMessage: async (_, { text, chatroomId }, req) => {
           
            console.log('addMessage');

            if (s_auth.isAuth(req)) { 

                const { userId } = req.auth;

                const owner = await s_user.getUserProfile(userId);

                const message = {
                    text,
                    chatroomId,
                    ownerName: owner.username,
                    userId: req.auth.userId,
                    createdAt: new Date(),
                };

                try {
                    
                    const messageData = await Message.create(message);
                   
                    pubsub.publish('newMessage', { newMessage: messageData.dataValues });
                    
                    return messageData.dataValues;

                } catch (err) {

                    console.log(err);
                    return err;
                }
            }

            return {};

        },

    },
};

module.exports = {
    pushMessageTypeDef,
    pushMessageResolvers,
};
