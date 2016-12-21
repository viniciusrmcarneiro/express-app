const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

var _connection = null;
var _userCollection = null;


const setup = (url) => {
    return MongoClient.connect(url)
        .then( newConnection => {
            _connection = newConnection;
            _userCollection = _connection.collection('users');
        });
}

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

const byId = (userId) => {
    return _userCollection
        .findOne({ _id: mongodb.ObjectId(userId) })
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
    setup,
    create,
    update,
    byUsername,
    byId,
    all,
    remove,
};