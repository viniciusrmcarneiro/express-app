const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userFilter = require('./filters/user-filter');
const adminFilter = require('./filters/admin-filter');
app.use(bodyParser.json());

const authentication = require('./api/authentication');
const user = require('./api/user');

app.post('/authentication', authentication);


app.put('/users/:userId', userFilter, user.update)
app.post('/users', userFilter, adminFilter, user.create);
app.get('/users', userFilter, adminFilter, user.all);


app.listen(3000, function () {
	console.log('Example app listening on port 3000!')
});

// const userRoutes = express.Router();
// userRoutes.
