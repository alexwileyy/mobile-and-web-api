const db = require('../helpers/database-helper');

/**
 * Get all tasks for a given user from the Tasks table.
 * @returns {Promise<*>}
 */
exports.getAllTasks = async function(userId){

    return new Promise(async (resolve, reject)=>{

        try{

            // Return the database and client instance from the database helper
            const [database, client] = await db.establishConnection();

            // Get the tasks from the Tasks collection on the database
            const users = database.collection('Tasks');

            // Find the user by the user ID from the database
            users.find({userId: userId}).toArray((err, docs) => {
                // Close the database connection
                db.closeConnection(client);
                // Resolve with the docs
                resolve(docs);
            });

        } catch(err){
            reject(err);
        }

    });
};

/**
 * Get a specific task for a given user from the Tasks table.
 * @param userId
 * @param taskId
 * @returns {Promise<*>}
 */
exports.getTask = async function(userId, taskId){

    return new Promise(async (resolve, reject)=>{

        try{
            // Return the database and client instance from the database helper
            const [database, client] = await db.establishConnection();

            // Get the tasks from the Tasks collection on the database
            const users = database.collection('Tasks');

            // Find the user by the user ID from the database
            users.find({userId: userId, _id: taskId}).toArray((err, docs) => {
                // Close the database connection
                db.closeConnection(client);
                // Resolve with the docs
                resolve(docs);
            });

        } catch(err){
            reject(err);
        }

    });
};


/**
 * Create a new task in the database
 * @param userId
 * @param taskName
 * @returns {Promise<*>}
 */
exports.createTask = async function(userId, taskName){

    return new Promise(async (resolve, reject)=>{

        try{
            // Return the database and client instance from the database helper
            const [database, client] = await db.establishConnection();

            // Get the tasks from the Tasks collection on the database
            const taskCollection = database.collection('Tasks');

            // Create a new object with the data that will be stored to the database.
            let newTask = {
                userId: parseInt(userId),
                taskName,
                createdOn: '26/02/19',
                status: 'in-progress'
            };

            // Insert the data into the mongodb database
            taskCollection.insert(newTask, (err, result) => {
                // Close the connection
                db.closeConnection(client);
                // Reolve with the result
                resolve(result);
            });

        } catch(err){
            // Reject if error
            reject(err);
        }

    });
};