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
var nodemailer = require('nodemailer');


router.post('/', function(req, res, next) {
	var transporter = nodemailer.createTransport("direct", {debug: true});
	
	var report = req.body;
			
	var subjectLine = "expense report status change";

	if(report.status === "submitted" && report.user == req.user._id){ //back-end security
		var userEmail = req.user.name + "@catalystitservices.com";
		console.log("userEmail = " + userEmail);
		var emailText = "<html><style>td, th{margin-right: 2em;} button{border: thin solid black; border-radius: 5px;}</style><h2>Name: <b>" + report.name + "</b></h2><h2>Line Items:</h2><table><thead><tr><th> Type </th><th> Amount </th></tr></thead><tbody>";
		for(var i = 0; i < report.items.length; i++){
			emailText += "<tr><td> " + report.items[i].type + " </td><td> $" + report.items[i].value + " </td></tr>";
		}
		emailText += "</tbody></table><h2>Status: " + report.status.toUpperCase() + "</h2>";
		
		var emailUserText = "The following report has been " + report.status + ".<br>" + emailText + "</html>";
		
		transporter.sendMail({
			from: 'donotreply@quickrbooks.com',
			to: userEmail,
			subject: subjectLine,
			html: emailUserText
		});
		
		Project.findById(report.project, function(err, project){
			if (err) {
				return next(err);
			}
			User.findById(project.approver, function(error, approver){
				if(error){
					return next(error);
				}
				var approverEmail = approver.name + "@catalystitservices.com";
				var emailApproverText = "The following report has been " + report.status + " for your approval.<br>" + emailText;
			
				emailApproverText += "<h2>Project: " + project.name + "</h2><h2>Submitted By: " + req.user.name + "</h2>";
				if(report.hasOwnProperty('notes')){
					emailApproverText += "<h2>Notes: " + report.notes + "</h2></html>";
				}
				emailApproverText += "<a href='http://localhost:8080/app#/expense-report/" + report._id + "'><button>View Report</button></a></html>";
				
				transporter.sendMail({
					from: 'donotreply@quickrbooks.com',
					to: approverEmail,
					subject: subjectLine,
					html: emailApproverText
				});
			});
			
			
			
		});
		
		
	}
	
	
	transporter.close();
	res.json(report);
});
module.exports = router;
