'use strict';

var app = angular.module('QuickrBooks', ['ui.router', 'mgcrea.ngStrap', 'ui.utils.masks', 'ngFileUpload', 'ui.bootstrap'])
    .service('sharedProperties', function () {
        var expenseReport = {
            items: [],
            receipts: []
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
