app.controller('viewReportsCtrl', ['$scope', '$state', "expenseReportFactory", "projectFactory", "ExpenseReports", 'ExpenseReportsByApprover', 'sharedProperties',
    function ($scope, $state, expenseReportFactory, projectFactory, ExpenseReports, ExpenseReportsByApprover, sharedProperties) {
        $scope.reports = ExpenseReports.data;
        $scope.reportsByApprover = ExpenseReportsByApprover;
                $scope.statuses = [
                    {name: 'saved'},
                    {name: 'submitted'},
                    {name: 'approved'},
                    {name: 'denied'}
                ];
        
                $scope.approverLinks = [
                    {name: 'pending my approval', status: 'submitted', redirectfunction: function('submitted')},
                    {name: 'already approved', status: 'approved', redirectFunction: function('approved')}
                ];
        
        $scope.showReport = function (report) {
            expenseReportFactory.getById(report._id).then(
                function (success) {
                    var report = success.data;
                    if (report.hasOwnProperty('items')) {
                        for (var i = 0; i < report.items.length; i++) {
                            report.items[i].value = report.items[i].value / 100;
                        }
                    }
                    projectFactory.getAll().then(
                        function (success) {
                            var projects = success.data;
                            var projectId = 0;
                            for (var i = 0; i < projects.length; i++) {
                                if (projects[i]._id == report.project) {
                                    sharedProperties.setProjectId(i);
                                }
                            }
                        }
                    );
                    sharedProperties.setExpenseReport(report);
                    $state.go("expenseReport", {}, {
                        reload: true
                    });
                },
                function (error) {}
            );

        };
        
        $scope.goToReport = function (report._id)


    }
]);
