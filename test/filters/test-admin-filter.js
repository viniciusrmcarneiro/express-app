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

        beforeEach(function(){
        });

        afterEach(function(){
            sandbox.restore();
        });

        it('we should write some tests', function(){
            
        });
    });

});





