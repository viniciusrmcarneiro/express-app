const userRepo = require('../repo/user');

function _delete(req, res){
    // validating the request
    if (!req.params.userId){
        res.status(400);
        res.send();
        return;
    }

    return userRepo.remove(req.params.userId)
        .then( user => {
            res.status(200);
            res.send('ok');
        })
        .catch( ex => {
            console.error(ex.stack);

            res.status(500);
            res.send(ex.message);
        });
}

function all(req, res){
    return userRepo.all()
        .then( users => {
            res.status(200);
            res.send(users);
        });
}

function update(params){
    if (!params.userId){
        throw new errors.InvalidCall();
    }


    return userRepo.update(params.userId, req.body)
        .then( user => {
            res.status(200);
            res.send('ok');
        })
        .catch( ex => {
            console.error(ex.stack);

            res.status(500);
            res.send(ex.message);
        });
}

function create(params, context){
    if (!params.username || !params.password){
        throw new errors.InvalidCall();
    }

    const username = params.username;
    const password = params.password;

    if (username === password){
        throw new errors.InvalidPassword('username must be different from password.')
    }

    return userRepo.byUsername(username)
        .then( user => {
            if (user){
                throw new errors.DuplicateUser(ex.message);
            }

            return userRepo.create(username, password)
                .then( newUser => newUser.id)

        });
}

module.exports = {
    all,
    delete: _delete,
    update,
    create,
};