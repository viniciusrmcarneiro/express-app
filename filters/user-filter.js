const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	jwt.verify(req.headers['authentication-token'], 'just a simple screct phrase', function(err, decoded) {

		if (err){
			res.status(403);
			res.send('access denied');
			return;
		}

		req.token = decoded;
		next();
	});
};