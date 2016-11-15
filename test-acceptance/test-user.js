const chakram = require('chakram');
const expect = chakram.expect;

describe("USER API", function() {
    const userInfo = {
        username: `username-${new Date().toISOString()}`,
        password: `password-${new Date().toISOString()}`,
    };
    var userId;

    it("should create an user", function () {
        return chakram.post("http://localhost:3000/users", userInfo)
            .then( response => {
                expect(response).to.have.status(200);
                expect(response.body).to.be.a('string').to.have.length.of.at.least(1);
                userId = response.body;
            });
    });

    it("should authenticate the user", function () {
        return chakram.post("http://localhost:3000/authentication", { 
            username: userInfo.username,
            password: userInfo.password,
        })
            .then( response => {
                expect(response).to.have.status(200);
            });
    });

    it("should update the user", function () {
        return chakram.put(`http://localhost:3000/users/${userId}`, { 
            username: `x-${userInfo.username}`,
            password: `x-${userInfo.password}`,
        })
            .then( response => {
                expect(response).to.have.status(200);
            });
    });

});