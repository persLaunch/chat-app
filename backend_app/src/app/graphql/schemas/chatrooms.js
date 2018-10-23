
const s_auth = require('../services/s_auth');

const { Chatroom } = require('../../models');

const chatroomsTypeDef = `
  extend type Query {
    chatrooms: [Chatroom]
  }
`;

const chatroomsResolvers = {

    Query: {
        chatrooms: async (_, args, req) => {

            let chatrooms = [];

            if (s_auth.isAuth(req)) { 

                try {
                    
                    chatrooms = await Chatroom.findAll();
                        
                    return chatrooms;

                } catch (err) {

                    console.log(err);
                    return err;
                }
            }

            return chatrooms;
        },
    },
};

module.exports = {
    chatroomsTypeDef,
    chatroomsResolvers,
};
