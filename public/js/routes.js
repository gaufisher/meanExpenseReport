/**
 * Created by ddelaney on 12/3/2015.
 */
'use strict';

app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('viewReports', {
            url: '/',
            templateUrl: '../templates/viewReports.tpl.html',
            controller: 'viewReportsCtrl',
            resolve: {
                ExpenseReports: function(userFactory, expenseReportFactory) {
                    return userFactory.getCurrentUser().then(
                        function(success) {
                            return expenseReportFactory.getAllExpenseReports(success.data.name);
                        },
                        function(error) {
                            return "Not working";
                        }
                    );
                },
                ExpenseReportsByApprover: function(approveReportsFactory) {
                    return approveReportsFactory.getReports().then(
                        function(success) {
                            return success.data;
                        },
                        function(err) {
                            return err;
                        }
                    );
                }
            }
        }).state('project', {
            url:'/projects',
            templateUrl: '../templates/project.tpl.html',
            controller: 'projectCtrl'
        }).state('expenseReport', {
            url: '/expense-report',
            views:{
                '':{templateUrl: '../templates/expense_report.tpl.html',
                    controller: 'expenseReportCtrl'},
                'projectSelect@expenseReport':{
                    templateUrl: '../templates/projectSelect.tpl.html',
                    controller: 'projectSelectCtrl'}},
            resolve: {
                getReportById: function ($stateParams, expenseReportFactory) {
                    return expenseReportFactory.getById($stateParams.id);
                },
                getAllProjects: function (projectFactory) {
                    return projectFactory.getAll();
                },
                LineItemTypes: function(expenseReportFactory) {
                    return expenseReportFactory.getAllListItems();
                }
            }
        }).state('viewReport', {
            url: '/expense-report/:id',
            templateUrl: '../templates/expense_report.tpl.html',
            views:{
                '':{templateUrl: '../templates/expense_report.tpl.html',
                    controller: 'viewReportByIdCtrl'},
                'projectSelect@viewReport':{
                    templateUrl: '../templates/projectSelect.tpl.html',
                    controller: 'projectSelectCtrl'}},
            resolve: {
                Report: function(expenseReportFactory, $stateParams) {
                    console.log($stateParams.id);
                    return expenseReportFactory.getById($stateParams.id).then(
                        function(success) {
                            console.log(success.data);
                            return success.data;
                        },
                        function(error) {
                            return error;
                        }
                    );
                },
                LineItemTypes: function(expenseReportFactory) {
                    //console.log('LineItemTypes');
                    return expenseReportFactory.getAllListItems();
                },
                getAllProjects: function (projectFactory) {
                    return projectFactory.getAll();
                }
            }
        }).state('createProject', {
              url: '/createProject',
              templateUrl: '../templates/project.tpl.html',
              controller: 'projectCreateCtrl'
        }).state('approveReport', {
            url: '/approveReport/{id}',
            templateUrl: '../templates/submittedReport.tpl.html',
            controller: 'approveReportCtrl',
            resolve: {
                Report: function(approveReportsFactory, $stateParams) {
                    return approveReportsFactory.getReportById($stateParams.id).then(
                        function(success) {
                            return success.data;
                        },
                        function(error) {
                            return error;
                        }
                    );
                }
            }
        }).state('reportIApproved', {
            url: '/reportIApproved/{id}',
            templateUrl: '../templates/myApprovedReport.tpl.html',
            controller: 'reportIApprovedCtrl',
            resolve: {
                ApprovedReport: function(reportsIApprovedFactory, $stateParams) {
                    return reportsIApprovedFactory.getReportById($stateParams.id).then(
                        function(success) {
                            return success.data;
                        },
                        function(error) {
                            return error;
                        }
                    );
                }
            }
        }).state('theme', {
            url: '/hayes',
            templateUrl: '../templates/theme.tpl.html'
        });
}]);
