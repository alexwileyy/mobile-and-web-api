// A database helper for the mongoDB database
const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017";

const dbName = 'MobileAndWeb';

/**
 * Get all users from the Users collection.
 * @returns {Promise<*>}
 */
exports.establishConnection = async function() {
    return new Promise(async function(resolve, reject){
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {

            if(err){
                return reject(err);
            }

            const db = client.db(dbName);
            resolve([db, client]);
        });
    });
};


/**
 * Close a mongodb connection
 * @param client
 * @returns {Promise<void>}
 */
exports.closeConnection = async function(client){
    client.close();
};

module.exports = exports;
