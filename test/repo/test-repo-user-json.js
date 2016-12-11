const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;


const fs = require('fs');

describe('REPO - USER', function(){
    var target = require('../../repo/user-json');
    var sandbox = sinon.sandbox.create();

    beforeEach(function(){
    });

    afterEach(function(){
        sandbox.restore();
    });

    describe('byUsername', function(){
        it("should return the user", function(){
            const user = {
                id: '123',
                username: 'username-123',
                password: 'password-123',
            };
            
            sandbox.stub(fs, 'readFileSync', () => {
                return JSON.stringify({ [user.id]: user});
            });

            target.byUsername(user.username);

        });

    });



});





