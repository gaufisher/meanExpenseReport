app.controller('viewReportsCtrl', ['$scope', '$state', "expenseReportFactory", "ExpenseReports", 'sharedProperties',
    function($scope, $state, expenseReportFactory, ExpenseReports, sharedProperties) {
        $scope.reports = ExpenseReports.data;
		$scope.showReport = function(report){
			 sharedProperties.setExpenseReport(report);
			 $state.go("expenseReport", {}, {reload: true});	
		};

    }
]);
