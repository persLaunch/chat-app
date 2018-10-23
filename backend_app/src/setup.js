const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const m_passport = require('./app/middlewares/m_passport');
const app_config = require('./config');
const mo_redis = require('./app/modules/mo_redis');

function setupSessionEnvironment(app) {

    const cookieTTLOnClient = 1000 * 60 * 60; // Ici une session dure 1h = 1000ms * 60 * 60

    let cookie;
    let saveUninitialized;
    
    switch (process.env.NODE_ENV) {

    case 'development':  
        cookie = { maxAge: cookieTTLOnClient, secure: false, httpOnly: true };
        saveUninitialized = true;
        break;
    case 'staging': 
        cookie = { maxAge: cookieTTLOnClient, secure: true, httpOnly: true };
        saveUninitialized = true;
        break;
    case 'production': 
        cookie = { maxAge: cookieTTLOnClient, secure: true, httpOnly: true };
        saveUninitialized = true;
        break;
    default:
        break;
    }
        
    const sess = {
        
        secret: process.env.APPNAME_SESSION_SECRET,
        resave: false, 
        cookie,
        saveUninitialized,
    };

    if (app_config.REDIS_FOR_SESSION_ACTIVATED) { 

        sess.store = mo_redis.createSessionStore(
            process.env.APPNAME_REDIS_FOR_SESSION_PORT, 
            process.env.APPNAME_REDIS_FOR_SESSION_HOST,
        ); 
    }

    app.use(session(sess));

}


function setupProxyEnvironment(app) {
    
    switch (process.env.NODE_ENV) {
    case 'production': 
        app.set('trust proxy', 1); // trust first proxy
        break;
    default:
        break;
    }
}


function setupCORS(app) {

    const corsOptions = {
		
        origin: app_config.FRONTEND_HOSTNAME,
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        credentials: true, 
    };
    
    app.use(cors(corsOptions));

}


function setupPassport(app) {

    // SerializeUser is used to provide some identifying token that can be saved
    // in the users session.  We traditionally use the 'ID' for this.
    passport.serializeUser(m_passport.serializeUser);

    // The counterpart of 'serializeUser'.  Given only a user's ID, we must return
    // the user object.  This object is placed on 'req.user'.
    passport.deserializeUser(m_passport.deserializeUser);

    // Instructs Passport how to authenticate a user using a locally saved email
    // and password combination.  This strategy is called whenever a user attempts to
    // log in.  We first find the user model in MongoDB that matches the submitted email,
    // then check to see if the provided password matches the saved password. There
    // are two obvious failure points here: the email might not exist in our DB or
    // the password might not match the saved one.  In either case, we call the 'done'
    // callback, including a string that messages why the authentication process failed.
    // This string is provided back to the GraphQL client.
    passport.use(m_passport.localStrategy);
    passport.use(m_passport.jwtStrategy);

    // Passport is wired into express as a middleware. When a request comes in,
    // Passport will examine the request's session (as set by the above config) and
    // assign the current user to the 'req.user' object.  See also servces/auth.js
    app.use(passport.initialize());
    app.use(passport.session());

    
}

module.exports = {
  
    setupSessionEnvironment: app => setupSessionEnvironment(app),
    setupProxyEnvironment: app => setupProxyEnvironment(app),
    setupCORS: app => setupCORS(app),
    setupPassport: app => setupPassport(app),

};
