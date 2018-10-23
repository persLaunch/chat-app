
const { Message } = require('../../models');

const s_auth = require('../services/s_auth');
const s_user = require('../services/s_user');

const addMessageTypeDef = `
  extend type Mutation {
    addMessage(text: String, chatroomId: String): Message
}
`;

const addMessageResolvers = {
    Mutation: {
        addMessage: async (_, { text, chatroomId }, req) => {
           
            console.log('addMessage');

            if (s_auth.isAuth(req)) { 

                const { userId } = req.auth;

                const owner = await s_user.getUserProfile(userId);

                const message = {
                    text,
                    chatroomId,
                    ownerName: owner.username,
                    userId: req.auth.userId,
                };

                try {
                    
                    const messageData = await Message.create(message);
                    
                    console.log(messageData);
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
    addMessageTypeDef,
    addMessageResolvers,
};
