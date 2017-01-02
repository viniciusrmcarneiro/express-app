const express = require('express');
const serviceToMiddleware = require('./filters/service-to-express-middleware');
const user = require('./services/user');

const userFilter = require('./filters/user-filter');
const adminFilter = require('./filters/admin-filter');

const userExpress = express();

userExpress.put('/:userId', userFilter, adminFilter, serviceToMiddleware(user.update));
userExpress.post('/', userFilter, adminFilter, serviceToMiddleware(user.create));
userExpress.get('/', userFilter, adminFilter, serviceToMiddleware(user.all));
userExpress.delete('/:userId', userFilter, adminFilter, serviceToMiddleware(user.delete));

module.exports = userExpress;