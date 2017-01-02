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
       
        it.only('should return 500 if the function throws an error', function(){
            const myError = new Error('some error');

            // const msSpy = sandbox.stub();
            // msSpy.throws(myError);
        
            const msSpy = sandbox.spy( () => {
                throw myError;
            });


            target(() => msSpy)(req, res);
            sinon.assert.calledWithExactly(res.status, 500);
            sinon.assert.calledWithExactly(res.send, myError.message);
        });
    });

});





