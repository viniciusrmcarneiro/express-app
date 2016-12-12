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

module.exports = {
    AccessDenied,
    InvalidPassword,
    InvalidCall,
    InvalidCredentials,
}