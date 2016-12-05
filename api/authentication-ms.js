const userRepo = require('../repo/user');
const jwt = require('jsonwebtoken');
const resources =  require('../resources');

function authenticate(params, context){
    if (!params.username || !params.password){
        throw new Error(resources.messages.badRequest);
    }

    return userRepo
        .byUsername(params.username)
            .then( user => {

                if (!user){
                    context.log.warn("user not found");
                    throw new Error(resources.messages.accessDenied);
                }

                if (user.password != params.password){
                    context.log.warn("user password doesn't match.");
                    throw new Error(resources.messages.accessDenied);
                }

                const token = jwt.sign({
                    id : user.id,
                    isAdmin : user.isAdmin,
                }, 'just a simple screct phrase');

                return token;

            });
}

module.exports = {
    authenticate
};