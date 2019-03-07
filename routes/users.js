var express = require('express');
var router = express.Router();

const userModel = require('../models/users');

/* GET users listing. */
router.get('/', async function(req, res, next) {

  try {

    // Call the getAllUsers method on the userModel to retrieve the data from the database.
    const getUsers = await userModel.getAllUsers();

    // Send the data back to the client.
    res.sendResponse(200, getUsers);

  } catch(err){
    // Send errors
    console.log(err);
    res.sendResponse(500, {'msg': "Unexpected error."});
  }

});

router.get('/:id', async (req, res, next) => {

  const id = req.params['id'];

  // Ensure the ID has been sent as a param
  if(!id){
    res.sendResponse(400, {'msg': 'A user ID must be provided.'})
  }

  try{
    // Get the user from the model
    const getUser = await userModel.getUser(id);

    // Return with the user
    res.sendResponse(200, getUser);

  } catch(err){
    res.sendResponse(500, {'msg': "Unexpected error."});
  }

});

module.exports = router;
