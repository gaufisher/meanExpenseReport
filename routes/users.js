var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../models/users');
var User = mongoose.model('User');
/* GET users listing. */
router.get('/currentuser', function(req, res, next) {
    res.json(req.user);
});

module.exports = router;
