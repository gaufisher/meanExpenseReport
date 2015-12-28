'use strict';


var app = angular.module('QuickrBooks', ['ui.router', 'mgcrea.ngStrap', 'ui.utils.masks', 'ngAnimate', 'toastr'])
    .service('sharedProperties', function () {
        var expenseReport = {
            items: []
        };
        var projectId = 0;
        var userId = "";
        return {
            getExpenseReport: function () {
                return expenseReport;
            },
            setExpenseReport: function (report) {
                expenseReport = report;
            },
            getProjectId: function () {
                return projectId;
            },
            setProjectId: function (id) {
                projectId = id;
            },
            getUserId: function () {
                return userId;
            },
            setUserId: function (id) {
                userId = id;
            }
        };
    });
