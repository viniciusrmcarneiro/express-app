const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (!req.token  || !req.token.isAdmin){
        res.status(403);
        res.send();
        return;
    }

    next();
};


