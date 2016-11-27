const userRepo = require('../repo/user');
const jwt = require('jsonwebtoken');

function authentication(req, res){
	if (!req.body.username || !req.body.password){
		res.status(400);
		res.send();
		return;
	}
	return userRepo
		.byUsername(req.body.username)
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

				const token = jwt.sign({
					id : user.id,
					isAdmin : user.isAdmin,
				}, 'just a simple screct phrase');

				res.status(200);
				res.send(token);

			})
			.catch( ex => {
				res.status(500);
				res.send('Something wrong, try again.');
				console.error(ex);
			})
}

module.exports = authentication;