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

/* Post a project to database*/
router.post('/projects', function(req, res, next) {
  var project = new Project(req.body);

  project.save(function(err, project){
    if(err){ return next(err); }

    res.json(project);
  });
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
