
const debug = require('debug')('debug');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const passport = require('passport');
const mo_bcrypt = require('../modules/mo_bcrypt');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const appConfig = require('../../config');
const { Auth } = require('../models');


module.exports = {


    comparePassword: async (password, hashPassword) => {
        
        try { 
        
            const isMatch = await mo_bcrypt.comparePassword(password, hashPassword);
            
            if (!isMatch) { throw new Error('Invalid Credentials'); }

            return isMatch;
        } catch (err) {

            throw err;
        }

    },

    serializeUser: (auth, done) => {

        done(null, auth.id);
    },

    deserializeUser: (id, done) => {
        
        Auth.findById(id)
            .then(async (auth) => {

                return done(null, auth.dataValues);

              
            })
            .catch((err) => {
                return done(err, null);
            });
        
    },

    createLocalStrategy: (comparePassword) => {

        return new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        
            try { 
    
                const auth = await Auth.findOne({ where: { email: email.toLowerCase() } });
                await comparePassword(password, auth.password);
                done(null, auth);
            
            } catch (err) {
    
                done(err);
            }
            
        });
        
    },

    // Appelé automatiquement dans le middleware qui donne user qui rajoute dans la requête req.auth
    jwtStrategy: new JWTStrategy({

        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: appConfig.JWT_SECRET_TOKEN,
    },
    ((jwtPayload, cb) => {
     
        // find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return Auth.findOne({ where: { id: jwtPayload.id } })
            .then((auth) => {
                
                return cb(null, auth);
            })
            .catch((err) => {
                return cb(err);
            });
    })), 

    middlewarePassportJWT: (req, res, next) => {

        passport.authenticate('jwt', { session: false }, async (err, userObjectData) => {
    
            if (userObjectData) {
            
                const auth = { ...userObjectData.dataValues };
    
                delete auth.password;
            
                req.auth = auth;
            }
      
            next();
    
        })(req, res, next);
    },
};
