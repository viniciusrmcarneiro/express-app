const express = require('express');
const authentication = require('./api/authentication-ms');
const expressToMS = require('./filters/express-to-ms');

const authenticationExpress = express();

authenticationExpress.post('/', expressToMS(authentication.authenticate));


authenticationExpress.post('/', (req, res) => {
    
});

module.exports = authenticationExpress;