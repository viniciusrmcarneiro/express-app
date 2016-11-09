const userRepo = require('../repo/user');

function authentication(req, res){
	if (!req.body.username || !req.body.password){
		res.status(400);
		res.send();
		return;
	}

	return userRepo
		.getByUsername(req.body.username)
			.then( user => {
				if (!user){
					res.status(404);
					res.send('404');
					return;
				}

				if (user.password != req.body.password){
					res.status(401);
					res.send('401');
					return;
				}

				res.status(200);
				res.send('ok');

			})
			.catch( ex => {
				res.status(500);
				res.send('Something wrong, try again.');
				console.error(ex);
			})
}

module.exports = authentication;