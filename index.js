const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());

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
