
const { Chatroom } = require('../../models');

const chatroomTypeDef = `
  extend type Query {
    chatroom(id: ID): Chatroom
  }
`;

const chatroomResolvers = {

    Query: {
        chatroom: async (_, { id }) => {

            try {
                
                const plate = await Chatroom.findById(id);
                
                return plate;

            } catch (err) {

                console.log(err);
                return err;
            }

        },
    },
};

module.exports = {
    chatroomTypeDef,
    chatroomResolvers,
};
