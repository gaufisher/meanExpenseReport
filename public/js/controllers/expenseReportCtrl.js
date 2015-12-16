app.controller('expenseReportCtrl', ['$scope', '$state', 'expenseReportFactory', 'LineItemTypes', 'userFactory',
    function($scope, $state, expenseReportFactory, LineItemTypes, userFactory){
        $scope.expenseReport = {};
        $scope.showButton = false;
        /*userFactory.getCurrentUser().then(
            function(success) {
                $scope.expenseReport.user = success.data;
            }
        );*/

		$scope.expenseReport.user = {
							"_id": "56707a9e2c29fc36bf61955f"	
						};
        $scope.expenseReport.items = [];
            
        $scope.persist = function(status){
            $scope.expenseReport.status = status;
			for(var i = 0; i < $scope.expenseReport.items.length; i++)
			{
				if($scope.expenseReport.items[i].value == null)
				{
					$scope.expenseReport.items[i].value = 0.00;
				}
				var datMoney = $scope.expenseReport.items[i].value.toString();
				$scope.expenseReport.items[i].value = datMoney;
				
			}
            expenseReportFactory.createExpenseReport($scope.expenseReport).then(
                function(success) {
                    $state.go("viewReports", {}, {reload: true})
                },
                function(error) {
                   //console.log("working as intended");
                }
            );
        }
        
        $scope.addItem = function() {
            var item = {};
            item.type = $scope.dropdownvalue.name;
            $scope.showButton = true;
            var arr = $scope.expenseReport.items;
            arr.push(item);
            for (var i = 0; i < $scope.LineItemTypes.length; i++){
                if($scope.LineItemTypes[i].name === item.type){
                    $scope.dropdownvalue = {name:''};
                    $scope.LineItemTypes.splice(i,1);
                    break;
                }
            }
        }

        $scope.LineItemTypes = LineItemTypes.data;

        //$scope.validateDatMoney = function(datMoney) {
            //console.log(datMoney);
        //}
    }
]);
