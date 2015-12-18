app.controller('viewReportsCtrl', ['$scope', '$state', "expenseReportFactory", "ExpenseReports", 'sharedProperties',
    function($scope, $state, expenseReportFactory, ExpenseReports, sharedProperties) {
        $scope.reports = ExpenseReports.data;
		$scope.showReport = function(report){
			console.log("in the view reports controller, here's the selected report");
			console.log(report);
			expenseReportFactory.getById(report._id).then(
				function(success) {
					console.log("now here's the report");
					console.log(success.data);
					var report = success.data;
				/*	if(report.hasOwnProperty('items'))
					{
						for(var i = 0; i < report.items.length; i++)
						{
							report.items[i].value = (report.items[i].value).toFixed(2);
						}
					}*/
					
                    sharedProperties.setExpenseReport(report);
					$state.go("expenseReport", {}, {reload: true});
                },
                function(error) {
                   //console.log("working as intended");
                }
			);
			 	
		};

    }
]);
