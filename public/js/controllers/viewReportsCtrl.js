app.controller('viewReportsCtrl', ['$scope', "expenseReportFactory", "ExpenseReports",
    function($scope, expenseReportFactory, ExpenseReports) {
        $scope.reports = ExpenseReports.data;
    }
]);