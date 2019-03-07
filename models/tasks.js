const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    userId : Number,
    taskName : String,
    createdOn : String,
    status : String
}, {collection: 'Tasks'});

const TaskModel = mongoose.model("Task", taskSchema);

/**
 * Get all tasks for a given user from the Tasks table.
 * @param db
 * @param userId
 * @returns {Promise<*>}
 */
exports.getAllTasks = async function(db, userId){

    return new Promise(async (resolve, reject)=>{

        try{

            // Find the task from the collection that matches the user ID
            TaskModel.find({userId: userId}, (err, result) => {
                if(err){
                    // Reject with the error
                    reject(err);
                }
                // Resolve with the result
                resolve(result);
            })

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

            TaskModel.findById(taskId).exec((err, result) => {
                if(err){
                    resolve(err);
                }
                resolve(result);
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

            // Create a new object with the data that will be stored to the database.
            const newTask = new TaskModel({
                userId: parseInt(userId),
                taskName,
                createdOn: '26/02/19',
                status: 'in-progress'
            });

            newTask.save((err, newTask) => {
                if(err){
                    console.log(err);
                    reject(err);
                }
                resolve(newTask);
            });

        } catch(err){
            // Reject if error
            reject(err);
        }

    });
};