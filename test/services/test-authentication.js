const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

const mocks = require('../mocks');
const userRepo = require('../../repo/user');
const errors = require('../../utils/errors');


describe('AUTHENTICATION SERVICE', function(){
    const sandbox = sinon.sandbox.create();
    var target = require('../../services/authentication');
    const user = {
        username: 'user@user.com',
        password: '123',
    };

    beforeEach(function(){
        sandbox.spy(mocks.log, 'warn');
    });

    afterEach(function(){
        sandbox.restore();
    });

    it("should throw InvalidPassword if there're no username nor password", function(){
        return target.authenticate({})
            .should.be.rejectedWith(errors.InvalidCall);
    });

    it("should return a token if username and password are provided", function(){
        sandbox.stub(userRepo, 'byUsername', () => {
            return Promise.resolve(user);
        });

        return target.authenticate(user)
            .then( token => {
                expect(userRepo.byUsername.calledOnce).to.be.true;
                expect(userRepo.byUsername.calledWithExactly('user@user.com')).to.be.true;

                expect(token).to.be.a('string');
            });
    });

    it("should throw AccessDenied and log if there userid doesn't exist", function(){

        sandbox.stub(userRepo, 'byUsername', () => {
            return Promise.resolve(null);
        });
        
        return target.authenticate(user, {log : mocks.log})
            .should.be.rejectedWith(errors.AccessDenied)
            .then( () => {
                expect(userRepo.byUsername.calledOnce).to.be.true;
                expect(userRepo.byUsername.calledWithExactly('user@user.com')).to.be.true;

                sinon.assert.calledWithExactly(mocks.log.warn, 'user not found');
            });
    });

    it("should throw InvalidPassword if there password doesn't match", function(){
        sandbox.stub(userRepo, 'byUsername', () => {
            return Promise.resolve({
                username: 'user@user.com',
                password: 'wrong password',
            });
        });

        return target.authenticate(user, {log : mocks.log})
            .should.be.rejectedWith(errors.InvalidPassword)
            .then( () => {
                expect(userRepo.byUsername.calledOnce).to.be.true;
                expect(userRepo.byUsername.calledWithExactly('user@user.com')).to.be.true;

                sinon.assert.calledWithExactly(mocks.log.warn, "user password doesn't match.");
            });
    });

    it("if the userRepo fails should reject with the same error", function(){
        const myError = new Error('somthing went wrong.');
        sandbox.stub(userRepo, 'byUsername', () => {
            return Promise.reject(myError);
        });

        sandbox.stub(console, 'error', () => {});

        return target.authenticate(user)
            .should.be.rejectedWith(myError)
            .then( () => {
                expect(userRepo.byUsername.calledOnce).to.be.true;
                expect(userRepo.byUsername.calledWithExactly('user@user.com')).to.be.true;
            });
    });

});





