const express = require('express');
const app = express();


const authentication = require('./api/authentication');

app.post('/authentication', authentication);

app.listen(3000, function () {
	console.log('Example app listening on port 3000!')
});