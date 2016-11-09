const fs = require('fs');
const path = require('path');
const fileName = path.join(__dirname,'./users.json');

function getByUsername(username) {
	return new Promise( resolve => {

		const rawUsers = fs.readFileSync(fileName).toString();
		const users = JSON.parse(rawUsers);

		for (var i = users.length - 1; i >= 0; i--) {
			if (users[i].username === username){
				resolve(users[i]);
				return;
			}
		}

		resolve(null);
	});
};

module.exports = {
	getByUsername,
};