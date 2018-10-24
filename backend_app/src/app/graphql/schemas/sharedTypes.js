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
    ownerName: String
    createdAt: String
  }

  type UserActivity {
    status: Boolean
    user: User
    chatroomId: String
    createdAt: Float,
  }
`;

const sharedTypesResolvers = {

    Message: {

        owner(dataObj) {

            return User.findOne({ where: { id: dataObj.userId } });
        },
    },

    Chatroom: {

        messages: async (dataObj) => {

            let messages = [];
            
            try {

                messages = await Message.findAll({ 
                    where: { chatroomId: dataObj.id },
                    limit: 10,
                    order: [
                        ['createdAt', 'DESC'],
                    ],
                });

            } catch (err) { 

                console.log(err); 
            }

            return messages;
          
        },

    },
};

module.exports = {
    sharedTypesTypeDef,
    sharedTypesResolvers,
};
