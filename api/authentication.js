const userRepo = require('../repo/user');

function authentication(req, res){

	if (!req.body.username || !req.body.password){
		res.status(400);
		return;
	}

	return userRepo.getByUsername(req.body.username)
		.then( user => {

			if (!user){
				res.status(404);
				return;
			}

			if (user.password != req.body.password){
				res.status(401);
				return;
			}

			res.status(200);
			res.send('ok');

		})
}

module.exports = authentication;