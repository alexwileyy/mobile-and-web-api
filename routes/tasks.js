const express = require('express');
const router = express.Router();

// Import tasks model from  models directory
const taskModel = require('../models/tasks');

/* GET all tasks listing for a given user. */
router.get('/:userId', async function(req, res, next) {

  // Get the user ID from the query params
  let userId = req.params['userId'];

  // Check to see wherher the user ID value has been provided
  if(!userId){
    return res.sendResponse(422, {msg: 'A user ID must be provided to the server.'});
  }

  res.logger.info(`Getting all tasks for user ${userId}`);

  try {
    // Call the getAllUsers method on the userModel to retrieve the data from the database.
    const getTasks = await taskModel.getAllTasks(res.db, userId);

    // Send the data back to the client.
    res.sendResponse(200, getTasks)

  } catch(err){
    // Send errors
    console.log(err);
    res.sendResponse(500, {'msg': "Unexpected error."});
  }

});

/* GET specific task listing for a given user. */
router.get('/:userId/:taskId', async (req, res, next) => {

  // Get the user ID from the query params
  let userId = parseInt(req.params['userId']);

  // Get the user ID from the query params
  let taskId = req.params['taskId'];

  // Log out to log file
  res.logger.info(`Getting task (${taskId}) for user ${userId}.`);

  try {
    // Call the getAllUsers method on the userModel to retrieve the data from the database.
    const getTask = await taskModel.getTask(userId, taskId);

    // Send the data back to the client.
    res.sendResponse(200, getTask)

  } catch(err){
    // Send errors
    console.log(err);
    res.sendResponse(500, {'msg': "Unexpected error."});
  }

});

/* Create a new task for a given user. */
router.post('/:userId', async (req, res, next) => {

  // Get body from request
  const body = req.body;

  // Get user ID from query param (http://localhost:3000/tasks/{userId}})
  const userId = req.params['userId'];

  // Get task name from body
  const taskName = body['taskName'];

  if(!taskName){
    res.sendResponse(400, "A task name must be provided.");
  }

  try {
    // Call the getAllUsers method on the userModel to retrieve the data from the database.
    const getTasks = await taskModel.createTask(userId, taskName);

    // Send the data back to the client.
    res.sendResponse(200, getTasks)

  } catch(err){
    // Send errors
    res.sendResponse(500, {'msg': err});
  }

});

/* Create a sub-new task for a given user. */
router.post('/:userId/:taskId', async (req, res, next) => {

  // Get body from request
  const body = req.body;

  // Get user ID from query param (http://localhost:3000/tasks/{userId}})
  const userId = req.params['userId'];

  const taskId = req.params['taskId'];

  // Get task name from body
  const subTasks = body['subtasks'];

  try {
    // Call the getAllUsers method on the userModel to retrieve the data from the database.
    const getTasks = await taskModel.createSubTask(userId, taskId, body);

    // Send the data back to the client.
    res.sendResponse(200, getTasks)

  } catch(err){
    // Send errors
    res.sendResponse(500, {'msg': err});
  }

});

/* Update a task for a given user. */
router.put('/:userId/:taskId', async (req, res, next) => {

  // Get user ID from query param (http://localhost:3000/tasks/{userId}})
  const userId = req.params['userId'];

  // Get the task ID
  const taskId = req.params['taskId'];

  if(Object.keys(req.body).length <= 0){
    res.sendResponse(500, {'msg': "Request must have a body."});
    return;
  }

  try {
    // Call the getAllUsers method on the userModel to retrieve the data from the database.
    const updateTask = await taskModel.updateTask(userId, taskId, req.body);

    // Send the data back to the client.
    res.sendResponse(200, updateTask)

  } catch(err){
    // Send errors
    console.log(err);
    res.sendResponse(500, {'msg': err});
  }

});

/* Update a subtask for a given user. */
router.put('/:userId/:taskId/:subtaskId', async (req, res, next) => {

  // Get user ID from query param (http://localhost:3000/tasks/{userId}})
  const userId = req.params['userId'];

  // Get the task ID
  const taskId = req.params['taskId'];

  const subtaskId = req.params['subtaskId'];


  if(Object.keys(req.body).length <= 0){
    res.sendResponse(500, {'msg': "Request must have a body."});
    return;
  }

  try {
    // Call the getAllUsers method on the userModel to retrieve the data from the database.
    const updateTask = await taskModel.updateSubTask(userId, taskId, subtaskId, req.body);

    // Send the data back to the client.
    res.sendResponse(200, updateTask)

  } catch(err){
    // Send errors
    console.log(err);
    res.sendResponse(500, {'msg': err});
  }

});

/* Delete a task */
router.delete('/:userId/:taskId', async (req, res, next) => {

  // Get user ID from query param (http://localhost:3000/tasks/{userId}})
  const userId = req.params['userId'];

  // Get the task ID
  const taskId = req.params['taskId'];

  try {
    // Call the getAllUsers method on the userModel to retrieve the data from the database.
    const removeTask = await taskModel.removeTask(userId, taskId);

    // Send the data back to the client.
    res.sendResponse(200, removeTask)

  } catch(err){
    // Send errors
    console.log(err);
    res.sendResponse(500, {'msg': err});
  }

});

/* Delete a sub task */
router.delete('/:userId/:taskId/:subTaskId', async (req, res, next) => {

  // Get user ID from query param (http://localhost:3000/tasks/{userId}})
  const userId = req.params['userId'];

  // Get the task ID
  const taskId = req.params['taskId'];

  const subTaskId = req.params['subTaskId'];

  try {
    // Call the getAllUsers method on the userModel to retrieve the data from the database.
    const removeSubTask = await taskModel.removeSubTask(userId, taskId, subTaskId);

    // Send the data back to the client.
    res.sendResponse(200, removeSubTask)

  } catch(err){
    // Send errors
    console.log(err);
    res.sendResponse(500, {'msg': err});
  }

});



module.exports = router;
