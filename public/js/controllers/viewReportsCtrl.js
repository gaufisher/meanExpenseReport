app.controller('viewReportsCtrl', ['$scope', "expenseReportFactory", "ExpenseReports",
    function($scope, expenseReportFactory, ExpenseReports) {
        $scope.reports = ExpenseReports.data;
		$scope.showReport = function(report){
			
			 $state.go("expenseReport", {}, {reload: true});	
		};
    }
]);