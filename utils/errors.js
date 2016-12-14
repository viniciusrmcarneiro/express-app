const resources =  require('../resources');

class AccessDenied extends Error {
    constructor(){
        super(resources.messages.accessDenied);
        this.httpCode = 403;
    }
}

class InvalidPassword extends Error {
    constructor(){
        super(resources.messages.invalidPassword);
        this.httpCode = 403;
    }
}


class InvalidCall extends Error {
    constructor(){
        super(resources.messages.badRequest);
        this.httpCode = 400;
    }
}

class InvalidCredentials extends Error {
    constructor(){
        super(resources.messages.accessDenied);
        this.httpCode = 403;
    }
}

class DuplicateUser extends Error {
    constructor(){
        super(resources.messages.duplicateUser);
        this.httpCode = 409;
    }
}

class UserNotFound extends Error {
    constructor(){
        super(`User ${resources.messages.notFound}`);
        this.httpCode = 404;
    }
}

module.exports = {
    UserNotFound,
    AccessDenied,
    InvalidPassword,
    InvalidCall,
    InvalidCredentials,
    DuplicateUser,
}