const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const _databaseName = 'express-app';
const _mongoHost = 'localhost:27017';

const _mongoURL = `mongodb://${_mongoHost}/${_databaseName}`;

var _connection = null;
var _userCollection = null;

MongoClient.connect(_mongoURL)
    .then( newConnection => {
        _connection = newConnection;
        _userCollection = _connection.collection('users');
    })
    .catch( ex => console.error(ex));


const create = (username, password) => {
    return _userCollection
        .insert({username, password})
        .then( results => Object.assign( results.ops[0], { id: results.ops[0]._id}));
};

const update = (userId, userData) => {
    return _userCollection
        .update({
            _id: mongodb.ObjectId(userId)
        }, userData);
};

const byUsername = (username) => {
    return _userCollection
        .findOne({username})
            .then( user => {
                return user;
            });
};

const all = () => {
    return _userCollection.find().toArray()
        .then( users => {
            return users.map( user => {
                return {
                    id: user._id,
                    username: user.username,
                }
            });
        })
};

const remove = (userId) => {
    return _userCollection
        .remove({
            _id: mongodb.ObjectId(userId)
        });
}
module.exports = {
    create,
    update,
    byUsername,
    all,
    remove,
};