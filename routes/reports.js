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
    // report.save(function(err, report){
    //   if(err){ return next(err); }
    //   res.json(report);
    // });
    console.log(report);
    Report.findOne({"_id": report._id}, "status", function(err, status) {
        if (err) {
            return next(err);
        }
        console.log(status);
        if (status === "saved" || status === null) {
            report.save(function(err, report) {
                if (err) {
                    return next(err);
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
			rep.items[i].value = rep.items[i].value * 100;
		}
	}
	Report.findById(rep._id, function(err, report){
		if(err){ return next(err);}
        if ((report.status === "approved" || report.status === "denied") || (report.status !== "saved" && rep.status !== "saved")) {
            //Will need to validate if approver is approving/denying
            console.log("I can't do that");
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
			if(error){ return next(error); }
			res.json(report);
		});
	});
});

module.exports = router;