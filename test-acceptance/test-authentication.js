const chakram = require('chakram');
const expect = chakram.expect;

describe("AUTHENTICATION API", function() {
    const userInfo = {
        username: `username-${new Date().toISOString()}`,
        password: `password-${new Date().toISOString()}`,
    };

    const userAdminInfo = {
        "password": "123",
        "username": "my-username",
    };

    var userId;
    var userToken, adminToken;

    it("should authenticate as admin user", function () {
        return chakram.post("http://localhost:3000/authentication", { 
            username: userAdminInfo.username,
            password: userAdminInfo.password,
        })
            .then( response => {
                expect(response).to.have.status(200);
                adminToken = response.body;
            });
    });

    it("should return 403 if the password is wrong", function () {
        return chakram.post("http://localhost:3000/authentication", { 
            username: userAdminInfo.username,
            password: userAdminInfo.password+'a',
        })
            .then( response => {
                expect(response).to.have.status(403);
            });
    });

    it("should return 403 for in an invalid username", function () {
        return chakram.post("http://localhost:3000/authentication", { 
            username: userAdminInfo.username+'asd',
            password: userAdminInfo.password+'a',
        })
            .then( response => {
                expect(response).to.have.status(403);
            });
    });

});