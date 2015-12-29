
app.controller('viewReportsCtrl', ['$scope', '$state', "expenseReportFactory", "projectFactory", "ExpenseReports", 'ExpenseReportsByApprover', 
    function ($scope, $state, expenseReportFactory, projectFactory, ExpenseReports, ExpenseReportsByApprover) {
        $scope.reports = ExpenseReports.data;
        $scope.reportsByApprover = ExpenseReportsByApprover;
        $scope.statuses = [
            {name: 'Saved'},
            {name: 'Submitted'},
            {name: 'Approved'}
        ];

        $scope.approverLinks = [
            {name: 'Pending my Approval', status: 'submitted', order: 'timeSubmitted'},
            {name: 'Already Approved', status: 'approved', order: '-timeSubmitted'}
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
