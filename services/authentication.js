const userRepo = require('../repo/user');
const jwt = require('jsonwebtoken');
const resources =  require('../resources');

class AccessDenied extends Error {
    constructor(){
        super(resources.messages.accessDenied);
        this.httpCode = 403;
    }
}

class InvalidPassword extends Error {
    constructor(){
        super(resources.messages.accessDenied);
        this.httpCode = 403;
    }
}

class InvalidCall extends Error {
    constructor(){
        super(resources.messages.badRequest);
        this.httpCode = 400;
    }
}

function authenticate(params, context){
    if (!params.username || !params.password){
        throw new InvalidCall();
    }

    return userRepo
        .byUsername(params.username)
            .then( user => {

                if (!user){
                    context.log.warn("user not found");
                    throw new AccessDenied();
                }

                if (user.password != params.password){
                    context.log.warn("user password doesn't match.");
                    throw new InvalidPassword();
                }

                const token = jwt.sign({
                    id : user.id,
                    isAdmin : user.isAdmin,
                }, 'just a simple screct phrase');

                return token;

            });
}

module.exports = {
    authenticate,
};