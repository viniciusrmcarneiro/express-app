const userRepo = require('../repo/user');
const jwt = require('jsonwebtoken');
const resources =  require('../resources');
const errors = require('../utils/errors');

const promiseWrapper = (func) => {
    return function(){
        const args = Array.from(arguments);
        return new Promise( (resolve, reject) => {

            const promiseResult = func.apply(null, args);
            
            promiseResult
                .then(resolve)
                .catch(reject)
            

            /*
            short syntax
            func.apply(null, args)
                .then(resolve)
                .catch(reject);
            */
        });
    };
};


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
                    throw new errors.InvalidPassword();
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