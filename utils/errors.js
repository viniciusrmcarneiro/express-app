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


module.exports = {
    AccessDenied,
    InvalidPassword,
    InvalidCall,
}