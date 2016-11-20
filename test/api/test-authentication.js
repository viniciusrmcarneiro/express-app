const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const mocks = require('../mocks');
const userRepo = require('../../repo/user');

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
		sandbox.spy(res, 'send');
	});

	afterEach(function(){
		sandbox.restore();
	});

	it("should return 400 if there're no username nor password", function(){
		target(req, res);

		expect(res.status.calledOnce).to.be.true;
		expect(res.status.calledWithExactly(400)).to.be.true;
		expect(res.send.calledOnce).to.be.true;
	});

	it("should return 200 username and password are provided", function(){
		req.body.username = 'user@user.com';
		req.body.password = '123';

		sandbox.stub(userRepo, 'byUsername', () => {
			return Promise.resolve({
				username: 'user@user.com',
				password: '123',
			})
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

	it("should return 404 if there userid doesn't exists", function(){
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
				expect(res.status.calledWithExactly(404)).to.be.true;
				expect(res.send.calledOnce).to.be.true;
			});
	});

	it("should return 401 if there password doesn't match", function(){
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
				expect(res.status.calledWithExactly(401)).to.be.true;
				expect(res.send.calledOnce).to.be.true;
			});
	});

	it("should return 500 if the userRepo fails and log the error", function(){
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





