'use strict';

var app = angular.module('QuickrBooks', ['ui.router', 'mgcrea.ngStrap', 'ui.utils.masks'])
	.service('sharedProperties', function(){
		var expenseReport = {items:[]};
		var projectId = 0;
		//var project = {};
		var userId = "";
		return{
			getExpenseReport: function(){
				return expenseReport;
			},
			setExpenseReport: function(report){
				expenseReport = report;
			},
			getProjectId(){
				return projectId;
			},
			setProjectId(id){
				projectId = id;
			},
			/*getProject: function(){
				return project;
			},
			setProject: function(proj){
				project = proj;
			},*/
			getUserId: function(){
				return userId;
			},
			setUserId: function(id){
				userId = id;
			}
		};
	});