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

router.get('/expense-report', function(req, res, next) {
    Report.find(function(err, reports) {
        if (err) {
            return next(err);
        }
        res.json(reports);
    });
});

router.get('/expense-report/:id', function(req, res, next){
	var idString = req.params.id.toString();
	console.log(idString);
	var objId = mongoose.Types.ObjectId(idString);
	Report.find({'user': objId}, function(err, reports){
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

// //Test routes to get data from db
// router.get('/users', function(req, res, next) {
//    User.find(function(err, users) {
//        if (err) {
//            return next(err);
//        }
//        res.json(users);
//    });
// });
//

router.get('/project', function(req, res, next) {
    Project.find(function(err, projects) {
        if (err) {
            return next(err);
        }
        res.json(projects);
    });
});

router.get('/project/:id', function(req, res, next){
	var idString = req.params.id.toString();
	console.log(idString);
	var objId = mongoose.Types.ObjectId(idString);
	Project.findById(objId, function(err, project){
		if (err) {
            return next(err);
        }
        res.json(project);
	});
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
