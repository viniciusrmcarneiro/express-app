const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');

const app = express();
app.use(bodyParser.json());

app.use(function(req, res, next){
    req.log = logger;
    next();
});

// ********* authentication
const authentication = require('./api/authentication');
app.post('/authentication', authentication);
// **************

// ********* user
const userExpress = require('./user-app');
app.use('/users', userExpress);
// **************

app.listen(3000, function () {
	console.log('Example app listening on port 3000!')
});
