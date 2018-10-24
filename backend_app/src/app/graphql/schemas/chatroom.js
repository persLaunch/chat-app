
const s_auth = require('../services/s_auth');

const { Chatroom } = require('../../models');

const chatroomTypeDef = `
  extend type Query {
    chatroom(id: ID): Chatroom
  }
`;

const chatroomResolvers = {

    Query: {
        chatroom: async (_, { id }, req) => {

            if (s_auth.isAuth(req)) { 

                try {
                    
                    const chatroom = await Chatroom.findById(id);
                    return chatroom;

                } catch (err) {

                    console.log(err);
                    throw new Error('Error on creation');
                }
            }

            throw new Error('Not authenticated');

        },
    },
};

module.exports = {
    chatroomTypeDef,
    chatroomResolvers,
};
