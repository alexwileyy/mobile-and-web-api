const db = require('../helpers/database-helper');

/**
 * Get all users from the Users table.
 * @returns {Promise<*>}
 */
exports.getAllUsers = async function(){

    return new Promise(async (resolve, reject)=>{

        try{
            // Return the database and client instance from the database helper
            const [database, client] = await db.establishConnection();

            // Get the users collection
            const users = database.collection('Users');

            // Find all users and return them
            users.find({}).toArray((err, docs) => {
                db.closeConnection(client);
                resolve(docs);
            });

        } catch(err){
            reject(err);
        }

    });
};

/**
 * Gets a single user from the dastabase.
 * @param userId
 * @returns {Promise<*>}
 */
exports.getUser = async function(userId){

    return new Promise(async (resolve, reject) => {

        try{
            // Return the database and client instance from the database helper
            const [database, client] = await db.establishConnection();

            // Get the user from the Users collection on the database
            const user = database.collection('Users');

            // Find the user by the user ID from the database
            user.find({userId: userId.toString()}).toArray((err, doc) => {
                // Close the database connection
               db.closeConnection(client);
                // Resolve with the docs
               resolve(doc)
            });

        } catch(err){
            reject(err);
        }
    });
};

module.exports = exports;