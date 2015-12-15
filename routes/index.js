var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../models/users');
var User = mongoose.model('User');
require('../models/projects');
var Project = mongoose.model('Project');
require('../models/reports');
var Report = mongoose.model('Report');

//router.use("/js")express.static(__dirname + "../p")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// Test routes to get data from db
router.get('/users', function(req, res, next) {
    User.find(function(err, users) {
        if (err) {
            return next(err);
        }
        res.json(users);
    });
});

router.get('/projects', function(req, res, next) {
    Project.find(function(err, projects) {
        if (err) {
            return next(err);
        }
        res.json(projects);
    });
});

router.get('/reports', function(req, res, next) {
    Report.find(function(err, reports) {
        if (err) {
            return next(err);
        }
        res.json(reports);
    });
});


var mongoose = require('mongoose');
var ExpenseReport = mongoose.model('Report');

// Get all line item types
router.get('/line-item-types', function(req, res, next) {
    var lineItemTypes = [{value: 'Mileage'}, {value: 'Per Diem'}, {value: 'Lodging'}, {value: 'Travel'}, {value: 'Meals'}, {value: 'Entertainment'}, {value: 'Parking'}, {value: 'Other'}];
    res.json(lineItemTypes);
});

////Test routes to get data from db
//router.get('/users', function(req, res, next) {
//    User.find(function(err, users) {
//        if (err) {
//            return next(err);
//        }
//        res.json(users);
//    });
//});
//
//router.get('/projects', function(req, res, next) {
//    Project.find(function(err, projects) {
//        if (err) {
//            return next(err);
//        }
//        res.json(projects);
//    });
//});
//
//router.get('/reports', function(req, res, next) {
//    Report.find(function(err, reports) {
//        if (err) {
//            return next(err);
//        }
//        res.json(reports);
//    });
//});

module.exports = router;
