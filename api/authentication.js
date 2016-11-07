function authentication(req, res){

	if (!req.body.username || !req.body.password){
		res.status(400);
		return;
	}

	res.status(200);
	res.send('ok');
}

module.exports = authentication;