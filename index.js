const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const authentication = require('./api/authentication');

app.post('/authentication', authentication);

app.listen(3000, function () {
	console.log('Example app listening on port 3000!')
});