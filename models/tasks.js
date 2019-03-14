const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');

const taskSchema = mongoose.Schema({
    userId : Number,
    taskName : String,
    createdOn : String,
    status : String,
    subTasks: Array
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
                if(!result){
                    reject(result);
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
                status: 'in-progress',
                subTasks: []
            });

            newTask.save((err, newTask) => {
                if(err){
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


/**
 * Creates a new sub task for a task
 * @param userId
 * @param taskId
 * @param subtasks
 * @returns {Promise<*>}
 */
exports.createSubTask = async function(userId, taskId, subtasks){

    return new Promise(async (resolve, reject)=>{

        try{
            let update = subtasks;

            if(!Array.isArray(subtasks)){
                update = [subtasks];
            }

            update.map(item => {
                const date = new Date();
                let day = date.getDate(),
                    month = date.getMonth() + 1;
                day = day <= 9 ? `0${day}` : day;
                month = month <= 9 ? `0${month}` : month;
                item.id = uuidv1();
                item.createdOn = `${day}/${month}/${date.getUTCFullYear()}`;
                item.status = "in-progress";
                return item;
            });

            TaskModel.findOneAndUpdate({_id: taskId, userId}, {$push: {subTasks: update}}, (err, done) => {
                if(err){
                    reject(err);
                }
                resolve(done);
            })

        } catch(err){
            // Reject if error
            reject(err);
        }

    });
};


/**
 * Update Task matched against user and task
 * @param userId
 * @param taskId
 * @param body
 * @returns {Promise<any>}
 */
exports.updateTask = (userId, taskId, body) => {

    return new Promise((resolve, reject) => {

        try{
            TaskModel.findOneAndUpdate({_id: taskId, userId}, {...body}, (err, doc)=>{
                if(err){
                    reject(err);
                }
                if(!doc){
                    reject("Document not found.")
                }
                resolve(doc);
            })
        } catch(err){
            reject(err);
        }

    });

};


/**
 * Update a sub task for a given user and task id
 * @param userId
 * @param taskId
 * @param subtaskId
 * @param body
 * @returns {Promise<any>}
 */
exports.updateSubTask = (userId, taskId, subtaskId, body) => {

    return new Promise((resolve, reject) => {

        try{
            TaskModel.findOne({_id: taskId, userId}, (err, doc) => {
                if(doc){
                    doc.subTasks = doc.subTasks.map(item => {
                        if(item.id === subtaskId) {
                            return Object.assign(item, body);
                        }
                        return item;
                    });

                    // Mark the array as modfiied
                    doc.markModified('subTasks');

                    doc.save((err, newDoc) => {
                        if(err){
                            reject(err);
                        }
                        resolve(newDoc);
                    });
                } else {
                    reject("Document not found");
                }
                // resolve(doc);
            });
        } catch(err){
            reject(err);
        }

    });

};


/**
 * Remove a task from the database
 * @param userId
 * @param taskId
 * @returns {Promise<any>}
 */
exports.removeTask = (userId, taskId) => {

    return new Promise((resolve, reject) => {

        try{
            TaskModel.findById(taskId, (err, found) => {
                if(err){
                    reject(err);
                }
                if(found && found['userId'] === parseInt(userId)){
                    TaskModel.findOneAndDelete({_id: taskId, userId}, (err, result) => {
                        if(err){
                            reject(err);
                        }
                        resolve(`Successfully deleted task (${taskId})`);
                    })
                } else {
                    reject("Cannot delete another users tasks.")
                }
            });

        } catch(err) {
            reject(err);
        }

    });

};

/**
 * Removes a sub task
 * @param userId
 * @param taskId
 * @param subtaskId
 * @returns {Promise<any>}
 */
exports.removeSubTask = (userId, taskId, subtaskId) => {

    return new Promise((resolve, reject) => {

        try{
            TaskModel.findOne({_id: taskId, userId}, (err, doc) => {
                if(doc){
                    doc.subTasks = doc.subTasks.filter(task => {
                        if(task.id !== subtaskId) {
                            return task;
                        }
                    });
                    // // Mark the array as modfiied
                    doc.markModified('subTasks');

                    doc.save((err, newDoc) => {
                        if(err){
                            reject(err);
                        }
                        resolve(newDoc);
                    });
                } else {
                    reject("Document not found");
                }
                // resolve(doc);
            });
        } catch(err){
            reject(err);
        }

    });

};