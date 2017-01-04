const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const jwt = require('jsonwebtoken');

chai.use(chaiAsPromised);
chai.should();

const errors = require('../../utils/errors');
const mocks = require('../mocks');

describe('FILTERS', function(){

    describe('USER', function(){
        var target = require('../../filters/user-filter');
        var sandbox = sinon.sandbox.create();

        var req;
        var res;
        var next;

        beforeEach(function(){
            req = mocks.req;
            res = mocks.res;
            next = sandbox.stub();
            
            sandbox.spy(res, 'status');
            sandbox.spy(res, 'send');
        });

        afterEach(function(){
            sandbox.restore();
        });

        it("should return 403 if request doesn't have a valid authentication-token", function(){
            req.headers['authentication-token'] = 'something';

            const jwtStub = sandbox.stub(jwt, 'verify', function(token, secret, cb){
                cb(true);
            });

            target(req, res, next);

            sinon.assert.calledOnce(res.status);
            sinon.assert.calledOnce(res.send);
            
            sinon.assert.calledWithExactly(res.status, 403);
            sinon.assert.calledWithExactly(res.send, 'access denied');
        });

        it("should call the next middleware if the token is valid", function(){
            req.headers['authentication-token'] = 'something';

            const jwtStub = sandbox.stub(jwt, 'verify', function(token, secret, cb){
                cb(null, "asdadsfads");
            });

            target(req, res, next);

            sinon.assert.notCalled(res.status);
            sinon.assert.notCalled(res.send);

            sinon.assert.calledOnce(next);
        });

        it("should get the decoded token set to the req.token", function(){
            req.headers['authentication-token'] = 'something';
            const decodedToken = 'xpto-123';

            const jwtStub = sandbox.stub(jwt, 'verify', function(token, secret, cb){
                cb(null, decodedToken);
            });

            target(req, res, next);

            chai.expect(req)
                .to.have.property('token')
                .to.be.equal(decodedToken);

        });
    });

});





