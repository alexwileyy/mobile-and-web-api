const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);

const colors = require('colors');

const url = "mongodb+srv://alex:LymeReg1s@mobileandweb-xvnbd.mongodb.net";

const dbName = 'MobileAndWeb';

/**
 * Get all users from the Users collection.
 * @returns {Promise<*>}
 */
exports.establishConnection = async function() {
    return new Promise(async function(resolve, reject){

        mongoose.connect(`${url}/${dbName}`);

        const db = mongoose.connection;
        db.once('open', () => {
            resolve(db);
        });
        db.on('error', () => {
            console.log('Failed to connect to the database instance.'.red);
            reject();
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
