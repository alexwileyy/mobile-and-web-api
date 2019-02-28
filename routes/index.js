var express = require('express');
var router = express.Router();

const test = async function(){

  return new Promise((resolve, reject) => {

    setTimeout(function(){
      // go get data from a database

      resolve("Hello")

    },2000);

  });
};

/* GET home page. */
router.get('/test', async function(req, res, next) {

  console.log('Before the await')

  const hello = await test();

  console.log('After the await')

  console.log(hello);

  res.send(hello);

});

module.exports = router;
