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

router.get('/expense-report', function(req, res, next) {
    Report.find(function(err, reports) {
        if (err) {
            return next(err);
        }
        res.json(reports);
    });
});

router.post('/expense-report', function(req, res, next){
	var report = new Report(req.body);
	report.save(function(err, report){
    if(err){ return next(err); }

		res.json(report);
	});
});


// Get all line item types
router.get('/line-item-types', function(req, res, next) {
    var lineItemTypes = [{name: 'Mileage'}, {name: 'Per Diem'}, {name: 'Lodging'}, {name: 'Travel'}, {name: 'Meals'}, {name: 'Entertainment'}, {name: 'Parking'}, {name: 'Other'}];
    res.json(lineItemTypes);
});

//router.get('/reports', function(req, res, next) {
// router.get('/projects', function(req, res, next) {
//    Project.find(function(err, projects) {
//        if (err) {
//            return next(err);
//        }
//        res.json(projects);
//    });
// });
//
// router.post('/reports', function(req, res, next) {
//     var aReport = new Report(req.body);
//     aReport.save(function(err, aReport) {
//        if (err) {
//            return next(err);
//        }
//        res.json(aReport);
//    });
//});

router.get('/expense-report', function (req, res, next) {
    Report.find(function(err, reports) {
        if (err) {
            return next(err);
        }
        res.json(reports);
    });
});
router.post('/expense-report', function (req, res, next) {
    console.log("attempting to post");
    var expenseReport = new Report(req.body);
    expenseReport.save(function(err, post){
        if(err) { return next(err); }

        res.json(post);
    });
});

module.exports = router;
