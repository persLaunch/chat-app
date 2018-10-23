const Sequelize = require('sequelize');

module.exports = (sequelize) => {

    const User = sequelize.define('User', {
        email: {
            type: Sequelize.STRING,
            unique: true, 
            allowNull: false,
        },
        signedUpAt: { 
            type: Sequelize.DATE,
            allowNull: false,
        },
        firstName: { type: Sequelize.STRING },
        lastName: { type: Sequelize.STRING },
        username: { type: Sequelize.STRING },
    },
    {});
   
    return User;
};
