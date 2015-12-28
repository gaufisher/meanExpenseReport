app.controller('viewReportsCtrl', ['$scope', '$state', "expenseReportFactory", "projectFactory", "ExpenseReports", 'sharedProperties',
    function ($scope, $state, expenseReportFactory, projectFactory, ExpenseReports, sharedProperties) {
        $scope.reports = ExpenseReports.data;
        $scope.showReport = function (id) {
            $state.go("viewReport", {id: id}, {
                reload: true
            });
        };
    }
]);
