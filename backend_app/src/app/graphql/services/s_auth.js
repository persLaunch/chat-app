const passport = require('passport');
const jwt = require('jsonwebtoken');

const debug = require('debug')('debug');
const appConfig = require('../../../config');

const { Auth } = require('../../models');


module.exports = { 

    async register(userId, emailParam, password) {

        const email = emailParam.toLowerCase();

        const credInstance = new Auth({ userId, email, password });

        if (!email || !password) { throw new Error('You must provide an email and password.'); }
    
        try {

            const existingCred = await Auth.findOne({ where: { email } });
            
            if (existingCred) { throw new Error('Email in use'); }

            const credObject = await credInstance.save();
            return credObject.dataValues;
        
        } catch (err) {
            
            throw err;
        }

    },

    generateTokenAuth(loginTokenFunction, email, password) {

        const cred = {
            email, 
            password,
        };

        return new Promise((resolve, reject) => {

            try {

                loginTokenFunction(cred, { session: false }, (err2) => {

                    if (err2) { return reject(new Error('User not found')); }
                
                    // We generate a JWT with credObject and return it
                    const token = jwt.sign(cred, appConfig.JWT_SECRET_TOKEN);

                    return resolve(token);
                });

            } catch (err) {
    
                debug(err);
                return reject(err);
            }

            return null;
        });
    },
    
    login(email, password, loginTokenFunction) {

        return new Promise((resolve, reject) => {

            passport.authenticate('local', (err, cred) => {

                if (!cred) { return reject(new Error('User not found')); }
                if (err) { return reject(new Error('Invalid credentials.')); }

                return loginTokenFunction(cred.dataValues, { session: false }, (err2) => {

                    if (err2) { return reject(new Error('User not found')); }

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
