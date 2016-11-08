const fs = require('fs');
const path = require('path');
const fileName = path.join(__dirname,'./users.json');

function getByUsername(username) {
	return new Promise( resolve => {
		const rawUsers = fs.readFileSync(fileName).toString();
		const users = JSON.parse(rawUsers);
		console.log({users})
		resolve({username, password: '1234'});
	});
};

module.exports = {
	getByUsername,
};