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

    beforeEach(function(){
    });

    afterEach(function(){
        sandbox.restore();
    });

    it.only("should throw InvalidPassword if there're no username nor password", function(){
        try {
            return target.authenticate({})
                .then( a => console.log({a}))
                .catch( ex => {
                    console.log(ex);
                })
                .should.be.rejectedWith(errors.InvalidCall);
            
        } catch (error) {
            console.log({error})
        }
    });

    it("should return a token if username and password are provided", function(){
        req.body.username = 'user@user.com';
        req.body.password = '123';

        sandbox.stub(userRepo, 'byUsername', () => {
            return Promise.resolve({
                username: 'user@user.com',
                password: '123',
            });
        });

        return target(req, res)
            .then( () => {
                expect(userRepo.byUsername.calledOnce).to.be.true;
                expect(userRepo.byUsername.calledWithExactly('user@user.com')).to.be.true;

                expect(res.status.calledOnce).to.be.true;
                expect(res.status.calledWithExactly(200)).to.be.true;
                expect(res.send.calledOnce).to.be.true;
            });
    });

    it("should throw AccessDenied and log if there userid doesn't exists", function(){
        req.body.username = 'user@user.com';
        req.body.password = '123';

        sandbox.stub(userRepo, 'byUsername', () => {
            return Promise.resolve(null);
        });

        return target(req, res)
            .then( () => {
                expect(userRepo.byUsername.calledOnce).to.be.true;
                expect(userRepo.byUsername.calledWithExactly('user@user.com')).to.be.true;

                expect(res.status.calledOnce).to.be.true;
                sinon.assert.calledWithExactly(res.status, 403);
                expect(res.send.calledOnce).to.be.true;
                sinon.assert.calledWithExactly(req.log.warn, 'user not found');
            });
    });

    it("should throw InvalidPassword if there password doesn't match", function(){
        req.body.username = 'user@user.com';
        req.body.password = '123';

        sandbox.stub(userRepo, 'byUsername', () => {
            return Promise.resolve({
                username: 'user@user.com',
                password: 'wrong password',
            });
        });

        return target(req, res)
            .then( () => {
                expect(userRepo.byUsername.calledOnce).to.be.true;
                expect(userRepo.byUsername.calledWithExactly('user@user.com')).to.be.true;

                expect(res.status.calledOnce).to.be.true;
                expect(res.status.calledWithExactly(403)).to.be.true;
                expect(res.send.calledOnce).to.be.true;
                sinon.assert.calledWithExactly(req.log.warn, "user password doesn't match.");
            });
    });

    it("if the userRepo fails should reject with the same error", function(){
        req.body.username = 'user@user.com';
        req.body.password = '123';

        sandbox.stub(userRepo, 'byUsername', () => {
            return Promise.reject(new Error('somthing went wrong.'));
        });

        sandbox.stub(console, 'error', () => {});

        return target(req, res)
            .then( () => {
                expect(userRepo.byUsername.calledOnce).to.be.true;
                expect(userRepo.byUsername.calledWithExactly('user@user.com')).to.be.true;

                expect(res.status.calledOnce).to.be.true;
                expect(res.status.calledWithExactly(500)).to.be.true;

                expect(console.error.calledOnce).to.be.true;
                expect(console.error.calledWithExactly(new Error('somthing went wrong.'))).to.be.true;
                expect(res.send.calledOnce).to.be.true;
            });
    });

});





