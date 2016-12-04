const Logger = {
    warn: function(){
        const args = Array.from(arguments);
        console.log.apply(console, args);
    },
};


module.exports = Logger;