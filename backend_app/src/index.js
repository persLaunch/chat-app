
import http from 'http';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

require('@babel/register');
require('@babel/polyfill');

const expressGraphQL = require('express-graphql');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const schema = require('./app/graphql');

const app_config = require('./config');
const funcSetup = require('./setup');

const app = express();

// Display log of GET/Post in console [...]
app.use(morgan('dev'));

// Fill req.cookies = {...}
app.use(cookieParser());

// JSON Parser
app.use(bodyParser.json());

// Initialization of session. Allow you to get user's cookies in a 'Session' object
funcSetup.setupSessionEnvironment(app);
// Trust du proxy pour les cookies de session en production
funcSetup.setupProxyEnvironment(app);

// CORS set 'Access-Control-Allow-Origin' = client pour browser
funcSetup.setupCORS(app);

// Server Init
app.server = http.createServer(app);

// GRAPHQL
app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true,
}));

// Static www files use express
const wwwPath = path.join(__dirname, 'www');
app.use('/', express.static(wwwPath));

// LISTEN PORT
app.server.listen(app_config.BACKEND_SERVER_PORT, app_config.BACKEND_SERVER_HOSTNAME, () => {
    console.log('App is running on address', app.server.address());
    console.log(`App is running on port ${app.server.address().port}`);
});

export default app;
