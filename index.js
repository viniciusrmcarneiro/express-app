const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');

const _databaseName = 'express-app';
const _mongoHost = 'localhost:27017';
const _mongoURL = `mongodb://${_mongoHost}/${_databaseName}`;

const usersRepo = require('repo/users');
usersRepo
    .setup(_mongoURL)
    .catch( ex => console.error(ex));

const app = express();
app.use(bodyParser.json());

app.use(function(req, res, next){
    req.log = logger;
    next();
});

// // ********* authentication
// const authentication = require('./api/authentication');
// app.post('/authentication', authentication);
// // **************



// ********* authentication
const authenticationExpress = require('./authentication-app');
app.use('/authentication', authenticationExpress);
// **************

// ********* user
const userExpress = require('./user-app');
app.use('/users', userExpress);
// **************

app.listen(3000, function () {
	console.log('Example app listening on port 3000!')
});
