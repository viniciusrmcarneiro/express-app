const promiseWrapper = (func) => {
    return function(){
        const args = Array.from(arguments);
        return new Promise( (resolve, reject) => {

            const promiseResult = func.apply(null, args);
            
            promiseResult
                .then(resolve)
                .catch(reject);

            /*
            short syntax
            func.apply(null, args)
                .then(resolve)
                .catch(reject);
            */
        });
    };
};

module.exports = promiseWrapper;