const chakram = require('chakram');
const expect = chakram.expect;

describe("USER API", function() {
    it("should return 409 if the users already exists", function () {
    	const body = {
    		username: 'xyz',
    		password: '123',
    	}
        return chakram.post("http://localhost:3000/user", body)
        	.then( response => {
        		expect(response).to.have.status(409);
        	})
    });
});