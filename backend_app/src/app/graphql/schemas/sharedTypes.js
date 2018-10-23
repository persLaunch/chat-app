

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

                /* messages = messages.map(async (messageDataOriginal) => {

                    const messageData = { ...messageDataOriginal };

                    try {

                        const userData = await User.findOne({ where: { id: messageData.dataValues.userId } });
                    
                        messageData.dataValues.owner = userData.dataValues;
                      } catch (err) { 

                        console.log(err); 
                    }
                    
                    console.log("messageData ",messageData.dataValues); 
                    return messageData.dataValues;
                }); */

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
