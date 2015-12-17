'use strict';

var app = angular.module('QuickrBooks', ['ui.router', 'mgcrea.ngStrap', 'ui.utils.masks'])
	.service('sharedProperties', function(){
		var expenseReport = {items:[]};
		var project = {};
		return{
			getExpenseReport: function(){
				return expenseReport;
			},
			setExpenseReport: function(report){
				expenseReport = report;
			},
			getProject: function(){
				return project;
			},
			setProject: function(proj){
				project = proj;
			}
		};
	});