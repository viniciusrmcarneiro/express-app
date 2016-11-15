const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const authentication = require('./api/authentication');
const user = require('./api/user');

app.post('/authentication', authentication);
app.post('/users', user.create);
app.put('/users/:userId', user.update);


app.listen(3000, function () {
	console.log('Example app listening on port 3000!')
});