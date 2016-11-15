const userRepo = require('../repo/user');

function get(req, res){
}

function _delete(req, res){
}

function update(req, res){
	// validating the request
	if (!req.params.userId){
		res.status(400);
		res.send();
		return;
	}

	userRepo.update(req.params.userId, req.body)
		.then( user => {
			res.status(200);
			res.send('ok');
		})
		.catch( ex => {
			console.error(ex.stack);

			res.status(500);
			res.send(ex.message);
		});
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

	return userRepo.create(username, password)
		.then( newUser => {
			res.status(200);
			res.send(newUser.id);
		})
		.catch( ex => {
			if (ex.message == 'User name has already been taken'){
				res.status(409);
				res.send(ex.message);
				return;
			}

			console.error(ex.stack);

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