

const { User } = require('../../models');
const { Message } = require('../../models');

// Check for Types: https://graphql.org/learn/schema/
const sharedTypesTypeDef = `


  type User {
    id: ID
    email: String
    firstName: String
    lastName: String
    username: String
    signedUpAt: String
    
  }

  type Chatroom {
    id: ID
    title: String
    messages: [Message]
  }  

  type Message {
    id: ID
    text: String
    owner: User
    createdAt: String
  }

`;

const sharedTypesResolvers = {

    Message: {

        owner(dataObj) {

            return User.findOne({ where: { id: dataObj.userId } });

        },
    },

    Chatroom: {

        messages(dataObj) {
      
            return Message.findAll({ 
                where: { chatroomId: dataObj.id },
                limit: 10,
            });
        }

    }
};

module.exports = {
    sharedTypesTypeDef,
    sharedTypesResolvers,
};
