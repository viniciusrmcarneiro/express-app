const logger = require('../utils/logger');

const middleware = (ms, req, res) => {
    const params = Object.assign({}, req.body, req.params, req.query);
    const context = {
        log: logger,
    };

    return new Promise( (resolve, reject) => {
        ms(params, context)
            .then(resolve)
            .catch(reject);
    })
    .then( data => {
        res.status(200);
        res.send(data);
    })
    .catch( ex => {
        if (!ex.httpCode){
            console.log('\n',ex, '\n----------');
        }

        res.status(ex.httpCode || 500);
        res.send(ex.message);
    });
};

module.exports = (ms) => middleware.bind(null, ms);
