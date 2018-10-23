
const { Chatroom } = require('../../models');

const s_auth = require('../services/s_auth');


const addChatroomTypeDef = `
  extend type Mutation { 
    addChatroom(title: String!): Chatroom 
  }
`;

const addChatroomResolvers = {
    Mutation: {
        addChatroom: async (_, { title }, req) => {
           
            console.log('addChatroom');

            if (s_auth.isAuth(req)) { 

                const chatroom = {
                    title,
                    messages: [],
                };

                try {
                    
                    const chatroomData = await Chatroom.create(chatroom);
                   
                    return chatroomData.dataValues;

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

    addChatroomTypeDef,
    addChatroomResolvers,
};
