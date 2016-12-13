const userRepo = require('../repo/user');
const jwt = require('jsonwebtoken');
const resources =  require('../resources');
const errors = require('../utils/errors');
const promiseWrapper = require('../utils/promise-wrapper');


function authenticate(params, context) {
    if (!params.username || !params.password){
        throw new errors.InvalidCall();
    }

    return userRepo
        .byUsername(params.username)
            .then( user => {

                if (!user){
                    context.log.warn("user not found");
                    throw new errors.AccessDenied();
                }

                if (user.password != params.password){
                    context.log.warn("user password doesn't match.");
                    throw new errors.InvalidCredentials();
                }   

                const token = jwt.sign({
                    id : user.id,
                    isAdmin : user.isAdmin,
                }, 'just a simple screct phrase');

                return token;

            });
}

module.exports = {
    authenticate: promiseWrapper(authenticate),
};