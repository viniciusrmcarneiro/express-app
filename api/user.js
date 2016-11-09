const userRepo = require('../repo/user');

function get(req, res){
}

function _delete(req, res){
}

function update(req, res){
}

function create(req, res){

	if (!req.body.username || !req.body.password){
		res.status(400);
		res.send();
		return;
	}

	if (req.body.username === req.body.password){
		res.status(400);
		res.send('username must be different from password.');
		return;
	}

}

module.exports = {
	get: get,
	delete: _delete,
	update,
	create,
};