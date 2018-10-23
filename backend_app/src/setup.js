const cors = require('cors');
const session = require('express-session');
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

module.exports = {
  
    setupSessionEnvironment: app => setupSessionEnvironment(app),
    setupProxyEnvironment: app => setupProxyEnvironment(app),
    setupCORS: app => setupCORS(app),
  
};
