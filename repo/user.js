const fs = require('fs');
const path = require('path');
const fileName = path.join(__dirname,'./users.json');
const shortid = require('shortid');

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

function create(username, password){
	return getByUsername(username)
		.then((user) => {
			if (user){
				throw new Error('User name has already been taken');
			}

			const rawUsers = fs.readFileSync(fileName).toString();
			const users = JSON.parse(rawUsers);

			users.push({username, password});

			fs.writeFileSync(fileName, JSON.stringify(users));

			return users[users.length-1];
		});
}

function update(username, userData){
	return getByUsername(username)
		.then((user) => {
			if (!user){
				throw new Error('Username does not exists');
			}

			const rawUsers = fs.readFileSync(fileName).toString();
			const users = JSON.parse(rawUsers);
			const id = shortid.generate();

			users.push({id, username, password});

			fs.writeFileSync(fileName, JSON.stringify(users));

			return users[users.length-1];
		});
}

module.exports = {
	getByUsername,
	create,
};