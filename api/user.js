const userRepo = require('../repo/user');

function get(req, res){
}

function _delete(req, res){
}

function update(req, res){
}

function create(req, res){
	// validating the request
	if (!req.body.username || !req.body.password){
		res.status(400);
		res.send();
		return;
	}

	const username = req.body.username;
	const password = req.body.password;

	if (username === password){
		res.status(400);
		res.send('username must be different from password.');
		return;
	}

	return userRepo.getByUsername(username)
		.then( user => {
			if (user){
				res.status(409);
				res.send('username is alredy taken.');
				return;
			}
		})
		.catch( ex => {
			res.status(500);
			res.send(ex.message);
		});
}

module.exports = {
	get: get,
	delete: _delete,
	update,
	create,
};