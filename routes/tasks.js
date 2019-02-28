var express = require('express');
var router = express.Router();
const mongo = require('mongodb');

// Import tasks model from  models directory
const taskModel = require('../models/tasks');

/* GET tasks listing for a given user. */
router.get('/:userId', async function(req, res, next) {

  // Get the user ID from the query params
  let userId = parseInt(req.params['userId']);

  // Check to see whether the user ID is an integrer value
  if(isNaN(userId)){
    return res.sendResponse(422, {msg: 'The User ID parameter must be an integer value.'});
  }

  // Check to see wherher the user ID value has been provided
  if(!userId){
    return res.sendResponse(422, {msg: 'A user ID must be provided to the server.'});
  }

  res.logger.info(`Getting all tasks for user ${userId}`);

  try {
    // Call the getAllUsers method on the userModel to retrieve the data from the database.
    const getTasks = await taskModel.getAllTasks(userId);

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
  let taskId = new mongo.ObjectID(req.params['taskId']);

  // Check to see whether the user ID is an integrer value
  if(isNaN(userId)){
    return res.sendResponse(422, {msg: 'The User ID parameter must be an integer value.'});
  }

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

router.post('/:userId', async (req, res, next) => {

  // Get body from request
  const body = req.body;

  // Get user ID from query param (http://localhost:3000/tasks/{userId}})
  const userId = req.params['userId'];

  // Get task name from body
  const taskName = body['taskName'];

  try {
    // Call the getAllUsers method on the userModel to retrieve the data from the database.
    const getTasks = await taskModel.createTask(userId, taskName);

    // Send the data back to the client.
    res.sendResponse(200, getTasks)

  } catch(err){
    // Send errors
    res.sendResponse(500, {'msg': "Unexpected error."});
  }


});

module.exports = router;
