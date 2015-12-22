var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path')
require('../models/users');
var User = mongoose.model('User');
require('../models/projects');
var Project = mongoose.model('Project');
require('../models/reports');
var Report = mongoose.model('Report');


/* Post a project to database*/
router.post('/projects', function(req, res, next) {
  var project = new Project(req.body);
  User.findOne({"name": req.user}, "_id", function(err, id) {
      project.approver = id;
      project.save(function(err, project){
        if(err){ return next(err); }

        res.json(project);
      });
  });

});

router.get('/projects', checkAuth,function(req, res, next) {
    Project.find(function(err, projects) {
        if (err) {
            return next(err);
        }
        res.json(projects);
    });
});

router.get('/project/:id', function(req, res, next){
	var idString = req.params.id.toString();
	console.log("in route for /project/:id");
	console.log(idString);
	var objId = mongoose.Types.ObjectId(idString);
	Project.findById(objId, function(err, project){
		if (err) {
            return next(err);
        }
        res.json(project);
	});
});
module.exports = router;