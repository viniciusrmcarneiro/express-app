const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();

const errors = require('../../utils/errors');
const mocks = require('../mocks');

describe('FILTERS', function(){

    describe('SERVICE TO MIDLLEWARE', function(){
        var target = require('../../filters/service-to-express-middleware');
        var sandbox = sinon.sandbox.create();
        var req;
        var res;

        beforeEach(function(){
            req = mocks.req;
            res = mocks.res;
            
            sandbox.spy(res, 'status');
            sandbox.spy(res, 'send');
        });

        afterEach(function(){
            sandbox.restore();
        });
       
        it('should return 500 if the function throws an error', function(){
            const myError = new Error('some error');
            sandbox.stub(console, 'log');
            const msSpy = sandbox.spy(() => Promise.reject(myError));

            return target(msSpy)(req, res)
                .then(() => {
                    sinon.assert.calledWithExactly(res.status, 500);
                    sinon.assert.calledWithExactly(res.send, myError.message);
                });
        });

        it('should return 404 if the function throws an error with a httpCode 404', function(){
            const myError = new Error('some error');
            myError.httpCode = 404;

            const msSpy = sandbox.spy(() => Promise.reject(myError));

            return target(msSpy)(req, res)
                .then(() => {
                    sinon.assert.calledWithExactly(res.status, 404);
                    sinon.assert.calledWithExactly(res.send, myError.message);
                });
        });

        it('should return 200 if the function succeeds', function(){
            const values = { name: 'blá blá', age: 12, };
            
        
            const msSpy = sandbox.spy(() => Promise.resolve(values));


            return target(msSpy)(req, res)
                .then(() => {
                    sinon.assert.calledWithExactly(res.status, 200);
                    sinon.assert.calledWithExactly(res.send, values);
                });
        });


    });

});





