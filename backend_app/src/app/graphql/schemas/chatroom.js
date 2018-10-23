
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

            let chatroom = {};
    
            if (s_auth.isAuth(req)) { 

                try {
                    
                    chatroom = await Chatroom.findById(id);
                    return chatroom;

                } catch (err) {

                    console.log(err);
                    return err;
                }
            }

            return chatroom;

        },
    },
};

module.exports = {
    chatroomTypeDef,
    chatroomResolvers,
};
