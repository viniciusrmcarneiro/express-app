
function getByUsername(username) {
	return new Promise( resolve => {
		resolve({username, password: '1234'});
	});
};

module.exports = {
	getByUsername,
};