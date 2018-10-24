
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

            console.log(req.auth);
            if (s_auth.isAuth(req)) { 

                try {
                    
                    const chatrooms = await Chatroom.findAll();
                        
                    return chatrooms;

                } catch (err) {

                    console.log(err);
                    throw new Error('Error when fetching chatrooms');
                }
            }

            throw new Error('Not authenticated');
        },
    },
};

module.exports = {
    chatroomsTypeDef,
    chatroomsResolvers,
};
