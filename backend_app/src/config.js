
// You need to import it here otherwise process.env won't have the variable in .env file
require('dotenv/config');

module.exports = {

    // JWT_AUTH
    JWT_SECRET_TOKEN: process.env.APPNAME_JWT_SECRET_TOKEN,
    
    // FRONTEND
    FRONTEND_HOSTNAME: process.env.APPNAME_FRONTEND_HOSTNAME,
  
    // BACKEND
    BACKEND_SERVER_PORT: parseInt(process.env.APPNAME_BACKEND_SERVER_PORT, 10),  
    BACKEND_SERVER_HOSTNAME: parseInt(process.env.APPNAME_BACKEND_SERVER_HOSTNAME, 10),

    // DATABASE
    SEQUELIZE_SYNC_FORCE: (process.env.APPNAME_SEQUELIZE_SYNC_FORCE === 'true'),

    // Redis session
    REDIS_FOR_SESSION_ACTIVATED: (process.env.APPNAME_REDIS_FOR_SESSION_ACTIVATED === 'true'),

};
