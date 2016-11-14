const chakram = require('chakram');
const expect = chakram.expect;

describe("USER API", function() {
    const userInfo = {
        username: `username-${new Date().toISOString()}`,
        password: `password-${new Date().toISOString()}`,
    };

    it("should creatae an user", function () {
        return chakram.post("http://localhost:3000/user", userInfo)
            .then( response => {
                expect(response).to.have.status(200);
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
});