const userRepo = require('../repo/user');
const errors = require('../utils/errors');
const promiseWrapper = require('../utils/promise-wrapper');

const Ajv = require('ajv');
const ajv = new Ajv();

function all(){
    return userRepo.all();
}

function _delete(params){

    if (!params.userId){
        throw new errors.InvalidCall();
    }

    return userRepo.byId(params.userId)
        .then( user => {
            if (!user){
                throw new errors.UserNotFound();
            }

            return userRepo.remove(params.userId)
                .then( user => params.userId );
        })

}

function update(params){
    if (!params.userId){
        throw new errors.InvalidCall();
    }

    const user = Object.assign({}, params);
    delete user.userId;

    if (user.username === user.password){
        throw new errors.InvalidPassword('username must be different from password.')
    }

    return userRepo.byUsername(user.username)
        .then( userDB => {
            if (userDB){
                throw new errors.DuplicateUser();
            }

            return userRepo.update(params.userId, user)
                .then( () => {
                    return {};
                });

        });

}

const _createSchema = {
    "title": "create user",
    "type": "object",
    "properties": {
        "username": {
            "type": "string",
            
        },
        "password": {
            "type": "string",
            "minLength": 6,
        },
    },
    "required": ["username", "password"],
};
function create(params){
    const valid = ajv.validate(_createSchema, params);
    if (!valid) {
        throw new errors.InvalidCall(ajv.errors);
    }

    const username = params.username;
    const password = params.password;

    if (username === password){
        throw new errors.InvalidPassword('username must be different from password.')
    }

    return userRepo.byUsername(username)
        .then( user => {
            if (user){
                throw new errors.DuplicateUser();
            }

            return userRepo.create(username, password)
                .then( newUser => newUser.id)

        });
}
create.schema = _createSchema;


module.exports = {
    all: promiseWrapper(all),
    delete: promiseWrapper(_delete),
    update: promiseWrapper(update),
    create: promiseWrapper(create),
};