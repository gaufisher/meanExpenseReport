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
			
	
	if(report.status === "submitted"){ 
		Report.findOne({"name": report.name}, function(err, rep) {
			if (err) {
				return res.status(500).json(err);
			}
			var subjectLine = "expense report status change";
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
					var attachments = function(){
						var attachments = [];
						for(var i = 0; i < report.receipts.length; i++){
							attachments.push({});
							attachments[i].filename = report.receipts[i].name;
							attachments[i].contents = new Buffer(report.receipts[i].dataString, 'base64');
							attachments[i].cid = report.receipts[i]._id;
						}
						console.log("attachments = ");
						console.log(attachments);
						
						return attachments;
					};
					emailApproverText += "<h2>Project: " + project.name + "</h2><h2>Submitted By: " + req.user.name + "</h2>";
					if(report.hasOwnProperty('notes')){
						emailApproverText += "<h2>Notes: " + report.notes + "</h2>";
					}
					if(report.hasOwnProperty('receipts') && report.receipts.length > 0){
						emailApproverText += "<h2>Receipts: See attached files</h2>"
					}
					emailApproverText += "<a href='http://localhost:8080/app#/approveReport/" + rep._id + "'><button>View Report</button></a></html>";
					
					if(report.hasOwnProperty('receipts') && report.receipts.length > 0){
						transporter.sendMail({
							from: 'donotreply@quickrbooks.com',
							to: approverEmail,
							subject: subjectLine,
							html: emailApproverText,
							attachments: attachments()
						});
					}
					else{
						transporter.sendMail({
							from: 'donotreply@quickrbooks.com',
							to: approverEmail,
							subject: subjectLine,
							html: emailApproverText
						});
					}
				});
			});
		});
	}
					
	if(report.status === "approved" || (report.status === "saved" && report.hasOwnProperty('rejections') && report.rejections.length > 0))
	{
		var emailText = "<html><style>td, th{margin-right: 2em;} button{border: thin solid black; border-radius: 5px;} .rejection{color: red;}</style><h2>Name: <b>" + report.name + "</b></h2><h2>Line Items:</h2><table><thead><tr><th> Type </th><th> Amount </th></tr></thead><tbody>";

		User.findById(report.user, function(err, user){
			if(err){
				return next(err);
			}
			Project.findById(report.project, function(error, project){
				if (error) {
					return next(err);
				}
				
				function getStatus(){
					if(report.status === "approved"){
						return report.status;
					}else{
						return "rejected";
					}
				};
				var subjectLine = "expense report " + getStatus();
				
			
				for(var i = 0; i < report.items.length; i++){
					emailText += "<tr><td> " + report.items[i].type + " </td><td> $" + (report.items[i].value) + " </td></tr>";
				}
				emailText += "</tbody></table><h2>Status: " + getStatus().toUpperCase() + "</h2>";
				
				
				var userEmail = user.name + "@catalystitservices.com";
				var emailUserText = "The following report has been " + getStatus() + ".<br>" + emailText;
				emailUserText += "<h2>Project: " + project.name + "</h2>";
				if(report.status === "saved" && report.hasOwnProperty('rejections')){
					emailUserText += "<h2>Reason(s) for Rejection:</h2><br>";
					
					for(var j = 0; j < report.rejections.length; j++){
			
						emailUserText += "<span class='rejection'>" + report.rejections[j].reason + "</span><br>";
					}

				}
				emailUserText += "</html>";
			
			
				transporter.sendMail({
					from: 'donotreply@quickrbooks.com',
					to: userEmail,
					subject: subjectLine,
					html: emailUserText

				});
						
			});

		});
	}
	
	
//	transporter.close();
	res.json(report);
});
module.exports = router;
