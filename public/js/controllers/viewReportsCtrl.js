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
                console.log("Attempting to go to the report I approved");
                console.log("The report contains: "+report);
                console.log("The report id is: "+report._id);
                $state.go("reportIApproved", {id: report._id}, {
                    reload: true
                });
                console.log("state attempted to change");
            }
        };

    }
]);
