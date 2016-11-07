const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const mocks = require('../mocks');

describe('API - authentication', function(){
	var target = require('../../api/authentication');
	var sandbox = sinon.sandbox.create();
	var res = mocks.res;
	var req;

	beforeEach(function(){
		req = {
			body: {},
		};
		sandbox.spy(res, 'status');
	});

	afterEach(function(){
		sandbox.restore();
	});

	it("should return 400 if there're no username nor password", function(){

		target(req, res);

		expect(res.status.calledOnce).to.be.true;
		expect(res.status.calledWithExactly(400)).to.be.true;
	});

	it("should return 200 username and password are provided", function(){
		req.body.username = 'user@user.com';
		req.body.password = '123';

		target(req, res);

		expect(res.status.calledOnce).to.be.true;
		expect(res.status.calledWithExactly(200)).to.be.true;
	});

});