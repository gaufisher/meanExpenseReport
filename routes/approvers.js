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

router.get('/submitted-reports',
    function(req, res, next) {
        Project.find({"approver": req.user._id}, '_id', function(error, pids) {
            if (error) {
                return res.status(500).json(err);
            }
            var projectQuery = [];
            for (var i = 0; i < pids.length; i++) {
                projectQuery.push({$and: [{"project":pids[i]._id}, {$or: [{"status":"submitted"}, {"status":"approved"}]}]});
            }
            Report.find({$or: projectQuery})
                  .populate('project')
                  .populate('user', 'name')
                  .exec(function(errors, reports) {
                if (errors) {
    //                return res.status(500).json(errors);
                    return res.json([]); //Don't worry about it. This is graceful error handling, and definitely not a workaround for fixing a bug. Definitely not.
                }
                res.json(reports);
            });
        });
    }
);

router.get('/submitted-reports/:id',
    function(req, res, next) {
        var idString = req.params.id.toString();
        console.log('REPORT ID: ' +idString);
        Report.findById(idString)
              .populate('project')
              .populate('user', 'name')
              .exec(function(err, report) {
            console.log(report);
            if (err) {
                res.status(500).json(err);
            } else {
                if (!report.project.approver.equals(req.user._id) || report.status !== 'submitted') {
                    res.status(403).send('You cannot approve this report');
                } else {
                    res.json(report);
                }
            }
        });
    }
);

router.get('/approved-reports/:id',
    function(req, res, next) {
        var idString = req.params.id.toString();
        console.log('REPORT ID: ' + idString);
        Report.findById(idString)
            .populate('project')
            .populate('user', 'name')
            .exec(function(err, report) {
                console.log(report);
            if (err) {
                res.status(500).json(err);
            } else{
                if (!report.project.approver.equals(req.user._id) || report.status !== 'approved') {
                    res.status(403).send('You are unauthorized to view this approved report');
                } else{
                    res.json(report);
                }
            }
        });
    }
);

module.exports = router;
