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
        User.findOne({"name": req.user}, '_id', function(err, id) {
            if (err) {
                return next(err);
            }
            Project.find({"approver": id}, '_id', function(error, pids) {
                if (error) {
                    return next(error);
                }
                var projectQuery = [];
                for (var i = 0; i < pids.length; i++) {
                    projectQuery.push({$and: [{"project":pids[i]._id}, {"status":"submitted"}]});
                }
                Report.find({$or: projectQuery})
                      .populate('project')
                      .populate('user', 'name')
                      .exec(function(errors, reports) {
                    if (errors) {
                        return next(errors);
                    }
                    res.json(reports);
                });
            });
        });
    }
);

module.exports = router;
