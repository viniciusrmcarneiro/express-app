
const fs = require('fs');

function getByUsername(username) {
	return new Promise( resolve => {
		const rawUsers = fs.readFileSync('./users.json');
		console.log(rawUsers);
		resolve({username, password: '1234'});
	});
};

module.exports = {
	getByUsername,
};