const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');

module.exports = {

    createSessionStore(port, host) {

        return new RedisStore({  
            client: redis.createClient(),
            port,
            host,
        });
    },

};
