const passport = require('passport');
const jwt = require('jsonwebtoken');

const debug = require('debug')('debug');
const appConfig = require('../../../config');

const { Auth } = require('../../models');


module.exports = { 

 
    register({ userId, email, password, req }) {

        return new Promise((resolve, reject) => {

            const credInstance = new Auth({ userId, email, password });

            if (!email || !password) { return reject(new Error('You must provide an email and password.')); }
        
            Auth.findOne({ where: { email } })
                .then((existingCred) => {

                    if (existingCred) { return reject(new Error('Email in use')); }

                    credInstance.save().then((credObject) => {

                        try {
                            
                            req.login(credObject.dataValues, { session: false }, (err2) => {

                                if (err2) { return reject(new Error('User not found')); }
                                
                                // We generate a JWT with credObject and return it
                                const token = jwt.sign(credObject.dataValues, appConfig.JWT_SECRET_TOKEN);

                                return resolve(token);
                            });

                        } catch (err) {
                    
                            debug(err);
                            return reject(err);
                        }

                        return null;
                    });

                    return null;
                })
                .catch((err) => {

                    debug(err);
                    return reject(new Error('An error occured')); 
                });
                  
            
            return null;
        });
    },
    
    login({ email, password, req }) {

        return new Promise((resolve, reject) => {

            passport.authenticate('local', (err, cred) => {

                if (!cred) {

                    return reject(new Error('User not found')); 
                }

                if (err) {

                    return reject(new Error('Invalid credentials.')); 
                }

                return req.login(cred.dataValues, { session: false }, (err2) => {

                    if (err2) {
                        return reject(new Error('User not found')); 
                    }

                    // We generate a JWT with credObject and return it
                    const token = jwt.sign(cred.dataValues, appConfig.JWT_SECRET_TOKEN);

                    return resolve(token);
                });


            })({ body: { email, password } });

        });
    },
  
    isAuth: (req) => {

        if (!req.auth || !req.auth.userId) {

            return false;
        }

        return true;
    },
};
