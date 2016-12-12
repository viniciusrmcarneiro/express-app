const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

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
        it("should return InvalidCall if there're no username nor password", function(){
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
                id: '123',
                username: 'test',
                password: 'password-123',
            };

            sandbox.stub(userRepo, 'byUsername', () => Promise.resolve(user));

            return target.update(user);
        });


    });

    describe('DELETE USER', function(){
        it("should throw InvalidCall if there're no userID", function(){
        });

        it("should throw NotFound if the userId doesn't exist", function(){
        });

        it("should delete the user", function(){
        });

    });

});





