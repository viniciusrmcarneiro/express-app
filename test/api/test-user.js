const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const mocks = require('../mocks');
const userRepo = require('../../repo/user');

describe('API - USER', function(){
	var target = require('../../api/user');
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

	describe('CREATE USER', function(){
		it("should return 400 if there're no username nor password", function(){
			target.create(req, res);

			expect(res.status.calledOnce).to.be.true;
			expect(res.status.calledWithExactly(400)).to.be.true;
			expect(res.send.calledOnce).to.be.true;
		});

		it("should return 400 if username and password are equal", function(){
			req.body.username = 'test';
			req.body.password = 'test';

			target.create(req, res);

			expect(res.status.calledOnce).to.be.true;
			expect(res.status.calledWithExactly(400)).to.be.true;

			expect(res.send.calledWithExactly('username must be different from password.')).to.be.true;
			expect(res.send.calledOnce).to.be.true;
		});

		it("should return 409 if username has already been taken", function(){
			req.body.username = 'test';
			req.body.password = 'password-123';

			sandbox.stub(userRepo, 'getByUsername', () => Promise.resolve({
				username: req.body.username,
				password: req.body.password,
			}));

			return target.create(req, res)
				.then(() => {
					expect(res.status.calledOnce).to.be.true;
					expect(res.status.calledWithExactly(409)).to.be.true;

					expect(res.send.calledWithExactly('username is alredy taken.')).to.be.true;
					expect(res.send.calledOnce).to.be.true;
				});

		});

	});



});





