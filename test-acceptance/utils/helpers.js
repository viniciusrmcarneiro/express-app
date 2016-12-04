const chakram = require('chakram');

const getAuthenticationToken = (username, password) => {
    return chakram
        .post("http://localhost:3000/authentication", { username, password,})
        .then( response => response.body);

};
 
module.exports = {
    getAuthenticationToken,
};