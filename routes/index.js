var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path')
require('../models/projects');
var Project = mongoose.model('Project');
require('../models/reports');
var Report = mongoose.model('Report');

//router.use("/js")express.static(__dirname + "../p")
/* GET home page. */

function checkAuth(req,res,next){
   if(!req.user)
      res.redirect(401,'/')
   else next()
}

router.all('/*',checkAuth)


router.get('/',function(req,res,next){
   res.render('index');
})


/* Post a project to database*/
router.post('/projects', function(req, res, next) {
    var project = new Project(req.body);
    project.uniqueName = project.name.toLowerCase();
	  project.approver = req.user._id;
    project.save(function(err, project){
      if(err){ return res.status(500).json(err); }

      res.json(project);
    });
});

router.get('/projects',function(req, res, next) {
    Project.find(function(err, projects) {
        if (err)
            return res.status(409).json(err);
        res.json(projects);
    });
});

router.get('/expense-report/:id', function(req, res, next){
	var idString = req.params.id.toString();
	var objId = mongoose.Types.ObjectId(idString);
	Report.findById(objId, function(err, report){
		if (err) {
            return res.status(500).json(err);;
        }
        console.log(req.user._id);
        if (!report.user.equals(req.user._id)) {
            res.status(403).send('No can do');
        } else {
            res.json(report);
        }
	});
});

router.get('/expense-report', function(req, res, next){
	Report.find({'user': req.user._id}, function(error, reports){
		if(error){
			return res.status(500).json(err);;
		}
		res.json(reports);
	});
});

router.post('/expense-report', function(req, res, next){
	var report = new Report(req.body);
    report.user = req.user._id;
    Report.findOne({"_id": report._id}, "status", function(err, status) {
        if (err) {
            return res.status(500).json(err);;
        }
        if (status === "saved" || status === null) {
            report.save(function(err, report) {
                if (err) {
                    return res.status(500).json(err);;
                }
                res.json(report);
            });
        } else {
            console.log("I can't do that");
        }
    });
});


// update an expense report
router.put('/expense-report', function(req, res, next){
	var rep = req.body;
	if(rep.hasOwnProperty('items')){
		for(var i = 0; i < rep.items.length; i++)
		{
			rep.items[i].value = rep.items[i].value.toString();
		}
	}
	Report.findById(rep._id, function(err, report){
		if(err){ return next(err);}
        console.log(report);
        console.log(rep);
        if (rep.status === "approved" || rep.status === "denied") {
            var anErr = false;
            Project.findById(report.project, function(err, project) {
                if (!project.approver.equals(req.user._id)) {
                    req.status(500).json({error: 'You are not the approver for this report.'});
                    anErr = true;
                }
                if (anErr) {
                    return;
                }
            });
        } else if ((report.status !== "saved" && rep.status !== "saved")) {
            console.log("I can't do that");
            res.status(500).json({error: 'Cannot edit a report that doesn\'t have a saved status.'})
            return;
        }
		for(var field in Report.schema.paths){
			if((field !== '_id') && (field !== '__v')){
				if(rep[field] !== undefined)
				{
					report[field] = rep[field];
				}
				else
				{
					report[field] = undefined;
				}
			}
		}
		report.save(function(error, report){
			if(error){ return res.status(500).json(error); }
			res.json(report);
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
	var objId = mongoose.Types.ObjectId(idString);
  console.log(objId)
	Project.findById(objId, function(err, project){
		if (err) {
            return res.status(500).json(err);
        }
        res.json(project);
	});
});
module.exports = router;
