
const Sequelize = require('sequelize');


module.exports = (sequelize) => {

    const Message = sequelize.define('Message', {

        text: { type: Sequelize.STRING },
        ownerName: { type: Sequelize.STRING },
        createdAt: { type: Sequelize.DATE, defaultValue: Date.now() },
        
    }, {});

    Message.associate = function (models) {

        // # v1 Used to obtain user of a message
        models.Message.belongsTo(models.User, { foreignKey: { name: 'userId', allowNull: false } }); // Adds foreignKey userId to Message

        // # v1 used to list all message from a chatroom
        models.Message.belongsTo(models.Chatroom, { foreignKey: { name: 'chatroomId', allowNull: false }, targetKey: 'id' }); // Adds foreignKey chatroomId to Message
  
    };
  
    return Message;
};
