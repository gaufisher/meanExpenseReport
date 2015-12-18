var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../models/users');
var User = mongoose.model('User');
/* GET users listing. */
router.get('/currentuser', function(req, res, next) {
  //res.send({ name: req.user});
	User.findOne({name: req.user}, function(err, users) {
        if (err) {
            return next(err);
        }
        res.json(users);
    });
});

module.exports = router;
