const chakram = require('chakram');
const expect = chakram.expect;

describe("USER API", function() {
    const userInfo = {
        username: `username-${new Date().toISOString()}`,
        password: `password-${new Date().toISOString()}`,
    };

    const userAdminInfo = {
        "password": "123",
        "username": "my-username",
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

    it("get all users should return 403 if the is not an admin", function () {
        return chakram.post("http://localhost:3000/authentication", { 
            username: userInfo.username,
            password: userInfo.password,
        })
            .then( authenticationResponse => {
                expect(authenticationResponse).to.have.status(200);
                const authenticationToken = authenticationResponse.body;
        
                return chakram.get(`http://localhost:3000/users`, {
                    headers: {
                        'authentication-token': authenticationToken,
                    }
                })
                .then( response => {
                    expect(response).to.have.status(403);
                })

            });

    });
    
    it("should get all users", function () {
        return chakram.post("http://localhost:3000/authentication", { 
            username: userAdminInfo.username,
            password: userAdminInfo.password,
        })
            .then( authenticationResponse => {
                const authenticationToken = authenticationResponse.body;
        
                return chakram.get(`http://localhost:3000/users`, {
                    headers: {
                        'authentication-token': authenticationToken,
                    }
                })
                    .then( response => {
                        expect(response).to.have.status(200);
                        expect(response.body)
                            .to.have.deep.property('0')
                            .to.have.keys('id','username');

                    });
            });

    });

});