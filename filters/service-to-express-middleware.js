const logger = require('../utils/logger');

const middleware = (ms, req, res) => {
    try {
        console.log('1');
        const params = Object.assign({}, req.body, req.params, req.query);
        const context = {
            log: logger,
        };

        return new Promise( (resolve, rejec) => {
        // console.log('2');
            ms(params, context)
                .then(resolve)
                .catch(rejec);
        })
        .then( data => {
            res.status(200);
            res.send(data);
        })
        .catch( ex => {
            // console.log('\n',ex, '\n----------');
            console.log('3 -> ', ex.httpCode || 500)
            console.log('3 -> ', ex.message)
            res.status(ex.httpCode || 500);
            res.send(ex.message);
        });

    } catch (ex) {
        // console.log(ex.stack || ex);
        res.status(500);
        res.send(ex.message);
    }
};

module.exports = (ms) => middleware.bind(null, ms);
