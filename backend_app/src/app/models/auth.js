
const Sequelize = require('sequelize');
const debug = require('debug')('debug');
const mo_bcrypt = require('../modules/mo_bcrypt');

module.exports = (sequelize) => {

    const Auth = sequelize.define('Auth', {

        password: Sequelize.STRING,
       
    }, {
        hooks: {

            beforeCreate: (user) => {
                
                debug('[beforeCreate] Info: Hashing the password');  
        
                return new Promise((resolve, reject) => {

                    mo_bcrypt.cryptPassword(user.password)
                        .then((hashPwd) => {
                            debug('Info: getting hashPwd');
            
                            user.password = hashPwd; /* eslint no-param-reassign:0 */ // allow for beforeCreate
        
                            debug('Info: password hashedSet');
        
                            resolve(user);
                        })
                        .catch((err) => {
        
                            reject(err);
        
                        });
        
                });
                
        
            }, 
        },
    });

    Auth.associate = function (models) {
    
        models.Auth.belongsTo(models.User, { foreignKey: { name: 'email', allowNull: false }, targetKey: 'email' }); // Adds foreignKey email to Auth
        models.Auth.belongsTo(models.User, { foreignKey: { name: 'userId', allowNull: false }, targetKey: 'id' }); // Adds foreignKey userId to Auth
    };
    return Auth;
};
