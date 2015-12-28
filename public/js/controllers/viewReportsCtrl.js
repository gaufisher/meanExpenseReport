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
            {name: 'pending my approval', status: 'submitted', redirectfunction: function('submitted'){}},
            {name: 'already approved', status: 'approved', redirectFunction: function('approved'){}}
        ];
  
        $scope.showReport = function (id) {
            console.log(id);
            $state.go("viewReport", {id: id}, {
                reload: true
            });
        };



    }
]);
