const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userId: String,
    name: String,
    dob: String,
    accountCreated: String
}, {collection: 'Users'});

const userModel = mongoose.model("User", userSchema);

exports.userModel = userModel;

/**
 * Get all users from the Users table.
 * @returns {Promise<*>}
 */
exports.getAllUsers = async function(){

    return new Promise(async (resolve, reject)=>{

        try{
            // Find all users and return them
            userModel.find({}, (err, result) => {
                if(err) {
                    reject(err);
                }
                resolve(result);
            })

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

            // Find the user by the user ID from the database
            userModel.find({userId: userId.toString()}, (err, result) => {
                if(err) {
                    reject(err);
                }
                resolve(result)
            })

        } catch(err){
            reject(err);
        }
    });
};

module.exports = exports;