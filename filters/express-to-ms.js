const logger = require('../utils/logger');

const middleware = (req, res) => {
    
};

const wrapper = () => {
    
};

module.exports = (ms) => {
    return (req, res) => {
        try {
            const params = Object.assign({}, req.body, req.params, req.query);
            const context = {
                log: logger,
            };

            ms(params, context)

        } catch (ex){
            
        }
    };
};