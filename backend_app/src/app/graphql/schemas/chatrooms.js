
const { Chatroom } = require('../../models');

const chatroomsTypeDef = `
  extend type Query {
    chatrooms: [Chatroom]
  }
`;

const chatroomsResolvers = {

    Query: {
        chatrooms: async () => {

            try {
                
                const chatroomArray = await Chatroom.findAll();
                    
                return chatroomArray;

            } catch (err) {

                console.log(err);
                return err;
            }

        },
    },
};

module.exports = {
    chatroomsTypeDef,
    chatroomsResolvers,
};
