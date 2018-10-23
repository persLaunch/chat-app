
const Sequelize = require('sequelize');

module.exports = (sequelize) => {

    const Chatroom = sequelize.define('Chatroom', {

        title: { type: Sequelize.STRING },
        
    }, {});

    Chatroom.associate = function (models) {

        models.Chatroom.hasMany(models.Message, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

    };
  
    return Chatroom;
};
