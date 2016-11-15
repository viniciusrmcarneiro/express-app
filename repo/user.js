const fs = require('fs');
const path = require('path');
const shortid = require('shortid');


const fileName = path.join(__dirname,'./users.json');
function getUsers(){
	const rawUsers = fs.readFileSync(fileName).toString();
	const users = JSON.parse(rawUsers);
	return users;
}

function storeUsers(users){
	fs.writeFileSync(fileName, JSON.stringify(users, null, 4));
}

function getByUsername(username) {
	return new Promise( resolve => {

		const users =  getUsers();
		const userIds = Object.keys(users);

		for (var i = userIds.length - 1; i >= 0; i--) {
			var userId = userIds[i];

			if (users[userId].username === username){
				resolve(users[userId]);
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

			const users =  getUsers();
			const userId = shortid.generate();

			users[userId] = {id: userId, username, password};

			storeUsers(users);

			return users[userId];
		});
}

function update(userId, userData){

	return new Promise((resolve) => {
		const users = getUsers();
		const user = users[userId];

		if (!user){
			throw new Error('userId does not exists');
		}

		const newUser = {
			id: user.id,
			username: userData.username,
			password: userData.password,
		};

		users[user.id] = newUser;

		storeUsers(users);

		resolve(newUser);
	});
}

module.exports = {
	getByUsername,
	create,
	update,
};