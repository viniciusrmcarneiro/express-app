const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();

const errors = require('../../utils/errors');
const mocks = require('../mocks');
const userRepo = require('../../repo/user');

describe('SERVICES - USER', function(){
    var target = require('../../services/user');
    var sandbox = sinon.sandbox.create();

    beforeEach(function(){
    });

    afterEach(function(){
        sandbox.restore();
    });

    describe('CREATE USER', function(){
        it("should throw InvalidCall if there're no username nor password", function(){
            return target.create({})
                .should.be.rejectedWith(errors.InvalidCall);
        });

        it("should throw InvalidPassword if username and password are equal", function(){
            return target.create({
                username: 'test',
                password: 'test',
            })
            .should.be.rejectedWith(errors.InvalidPassword);
        });

        it("should throw DuplicateUser if username has already been taken", function(){
            const user = {
                username: 'test',
                password: 'password-123',
            };

            sandbox.stub(userRepo, 'byUsername', () => Promise.resolve(user));

            return target.create(user)
                .should.be.rejectedWith(errors.DuplicateUser);

        });

        it("should create the user", function(){
            const user = {
                username: 'test',
                password: 'password-123',
            };

            sandbox.stub(userRepo, 'byUsername', () => Promise.resolve(null));
            sandbox.stub(userRepo, 'create', () => Promise.resolve(
                Object.assign( {id: '123'}, user)
            ));

            return target.create(user);

        });
        
    });

    describe('UPDATE USER', function(){
        it("should return InvalidCall if there're no userId", function(){
            return target.update({})
                .should.be.rejectedWith(errors.InvalidCall);
        });

        it("should throw InvalidPassword if username and password are equal", function(){
            return target.update({
                userId: '123',
                username: 'test',
                password: 'test',
            })
            .should.be.rejectedWith(errors.InvalidPassword);
        });

        it("should throw DuplicateUser if username has already been taken", function(){
            const user = {
                id: '123',
                username: 'test',
                password: 'password-123',
            };

            sandbox.stub(userRepo, 'byUsername', () => Promise.resolve(user));

            return target.update({
                userId: '1',
                username: 'test',
                password: 'password-123',
            }).should.be.rejectedWith(errors.DuplicateUser);
        });

        it("should update the user", function(){
            const user = {
                userId: '123',
                username: 'test',
                password: 'password-123',
            };

            const expectedUser = {
                username: 'test',
                password: 'password-123',
            };

            sandbox.stub(userRepo, 'byUsername', () => Promise.resolve(null));
            sandbox.stub(userRepo, 'update', () => Promise.resolve({}));

            return target.update(user)
                .then(() => {
                    sinon.assert.calledOnce(userRepo.update);
                    sinon.assert.calledWithExactly(userRepo.update, user.userId, expectedUser);
                })
        });

    });

    describe('DELETE USER', function(){
        it("should throw InvalidCall if there're no userID", function(){
            return target.delete({})
                .should.be.rejectedWith(errors.InvalidCall);
        });

        it("should throw NotFound if the userId doesn't exist", function(){
            const userId = '123';

            sandbox.stub(userRepo, 'byUsername', () => Promise.resolve(null));

            return target.delete({userId})
                .should.be.rejectedWith(errors.UserNotFound);
        });

        it("should delete the user", function(){
            const userId = '123';
            const user = {
                id: userId,
                username: '123',
            }

            sandbox.stub(userRepo, 'byUsername', () => Promise.resolve(user));
            sandbox.stub(userRepo, 'remove', () => Promise.resolve({}));

            return target.delete({userId})
                .then(() => {
                    sinon.assert.calledOnce(userRepo.remove);
                    sinon.assert.calledWithExactly(userRepo.remove, userId);
                })
        });

    });

});





