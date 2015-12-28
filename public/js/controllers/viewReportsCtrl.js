
app.controller('viewReportsCtrl', ['$scope', '$state', "expenseReportFactory", "projectFactory", "ExpenseReports", 'ExpenseReportsByApprover', 
    function ($scope, $state, expenseReportFactory, projectFactory, ExpenseReports, ExpenseReportsByApprover) {
        $scope.reports = ExpenseReports.data;
        $scope.reportsByApprover = ExpenseReportsByApprover;
        $scope.statuses = [
            {name: 'saved'},
            {name: 'submitted'},
            {name: 'approved'},
            {name: 'denied'}
        ];

        $scope.approverLinks = [
            {name: 'pending my approval', status: 'submitted'},
            {name: 'already approved', status: 'approved'}
        ];
  
        $scope.showReport = function (id) {
            $state.go("viewReport", {id: id}, {
                reload: true
            });
        };
        
        $scope.showApproverReport = function (report) {
            if(report.status === 'submitted'){
                $state.go("approveReport", {id: report._id}, {
                    reload: true
                });
            } else {
                $state.go("reportIApproved", {id: report._id}, {
                    reload: true
                });
            }
        };

    }
]);
