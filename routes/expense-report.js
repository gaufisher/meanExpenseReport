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
	
	User.findOne({'name': req.user}, "_id", function(err, id){
		
		var subjectLine = "expense report status change";
		
		if(report.status === "submitted" && report.user == id._id){ //back-end security
			var userEmail = req.user + "@catalystitservices.com";
			var emailText = "<style>td, th{margin-right: 2em;}</style><h2>Name: <b>" + report.name + "</b></h2><span><h2>Line Items:</h2><table><thead><tr><th> Type </th><th> Amount </th></tr></thead><tbody>";
			for(var i = 0; i < report.items.length; i++){
				emailText += "<tr><td> " + report.items[i].type + " </td><td> $" + report.items[i].value + " </td></tr>";
			}
			emailText += "</tbody></table></span><h2>Status: " + report.status.toUpperCase() + "</h2>";
			
			var emailUserText = "The following report has been " + report.status + ".<br>" + emailText;
		//	var emailApproverText = "The following report has been " + report.status + " for your approval.<br>" + emailText;
			//to-do: add in rest of email to approver (rest of expense report & button)
			transporter.sendMail({
				from: 'donotreply@quickrbooks.com',
				to: userEmail,
				subject: subjectLine,
				html: emailUserText
			});
		}
	});
	
	transporter.close();
	res.json(report);
});
module.exports = router;
