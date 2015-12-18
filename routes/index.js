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

//router.use("/js")express.static(__dirname + "../p")
/* GET home page. */

function checkAuth(req,res,next){
  console.log(req.user)
   if(!req.user){
     if(req.xhr)res.send({message:"no can do!"})
     else res.redirect('/')
 }
 else next()
}
router.all('/*',checkAuth)

router.get('/',function(req,res,next){
   res.render('index');
})


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

// Test routes to get data from db
router.get('/users',function(req, res, next) {
    User.find(function(err, users) {
        if (err) {
            return next(err);
        }
        res.json(users);
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

router.get('/expense-report/:id', function(req, res, next){
	var idString = req.params.id.toString();
	console.log("in route for /expense-report/:id");
	console.log(idString);
	var objId = mongoose.Types.ObjectId(idString);
	Report.findById(objId, function(err, report){
		if (err) {
            return next(err);
        }
        res.json(report);
	});
});

router.get('/expense-report', function(req, res, next){
	//var idString = req.params.id.toString();
	//var objId = mongoose.Types.ObjectId(idString);

	User.findOne({'name': req.user}, "_id", function(err, id){
		if(err){
			return next(err);
		}
		Report.find({'user': id}, function(error, reports){
			if(error){
				return next(error);
			}
			res.json(reports);
		});
	});
});

router.post('/expense-report', function(req, res, next){
	var report = new Report(req.body);
    User.findOne({"name" : req.user}, "_id", function(err, id) {
        if (err) {
            return next(err);
        }
        report.user = id;

        report.save(function(err, report){
            if(err){ return next(err); }
        });
    });
});

// Get all line item types
router.get('/line-item-types', function(req, res, next) {
    var lineItemTypes = [{name: 'Mileage'}, {name: 'Per Diem'}, {name: 'Lodging'}, {name: 'Travel'}, {name: 'Meals'}, {name: 'Entertainment'}, {name: 'Parking'}, {name: 'Other'}];
    res.json(lineItemTypes);
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
