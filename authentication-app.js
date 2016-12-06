const express = require('express');
const authentication = require('./services/authentication');
const serviceToMiddleware = require('./filters/service-to-express-middleware');

const authenticationExpress = express();

authenticationExpress.post('/', serviceToMiddleware(authentication.authenticate));

module.exports = authenticationExpress;