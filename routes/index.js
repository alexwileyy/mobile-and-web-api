const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
    console.log("hello");
    res.send("Working.");
});

module.exports = router;