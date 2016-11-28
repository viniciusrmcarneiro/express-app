const express = require('express');
const user = require('./api/user');

const userFilter = require('./filters/user-filter');
const adminFilter = require('./filters/admin-filter');

const userExpress = express();

userExpress.put('/:userId', userFilter, user.update)
userExpress.post('/', userFilter, adminFilter, user.create);
userExpress.get('/', userFilter, adminFilter, user.all);

module.exports = userExpress;