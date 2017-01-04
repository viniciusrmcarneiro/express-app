const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();

const errors = require('../../utils/errors');
const mocks = require('../mocks');

describe('FILTERS', function(){

    describe('ADMIN', function(){
        var target = require('../../filters/admin-filter');
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


        it("should return 403 if request doesn't have a token", function(){
            target(req, res, next);

            sinon.assert.calledOnce(res.status);
            sinon.assert.calledOnce(res.send);
            
            sinon.assert.calledWithExactly(res.status, 403);
            sinon.assert.calledWithExactly(res.send);
        });

        it("should return 403 if there is no Admin token", function(){
            target(req, res, next);

            req.token = {
                isAdmin: false,
            };

            sinon.assert.calledOnce(res.status);
            sinon.assert.calledOnce(res.send);
            
            sinon.assert.calledWithExactly(res.status, 403);
            sinon.assert.calledWithExactly(res.send);
        });

        it("should call next if there is a valid Admin token", function(){
            req.token = {
                isAdmin: true,
            };

            target(req, res, next);

            sinon.assert.notCalled(res.status);
            sinon.assert.notCalled(res.send);
            
            sinon.assert.calledWithExactly(next);
        });


    });

});





