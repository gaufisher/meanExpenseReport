app.controller('viewReportsCtrl', ['$scope', '$state', "expenseReportFactory", "projectFactory", "ExpenseReports",
    function ($scope, $state, expenseReportFactory, projectFactory, ExpenseReports) {
        $scope.reports = ExpenseReports.data;
        $scope.showReport = function (id) {
            $state.go("viewReport", {id: id}, {
                reload: true
            });
        };
    }
]);
