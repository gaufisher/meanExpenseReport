app.controller('expenseReportCtrl', ['$scope', '$state', 'expenseReportFactory', 'LineItemTypes', 'userFactory',
    function($scope, $state, expenseReportFactory, LineItemTypes, userFactory){
        $scope.expenseReport = {};
        $scope.showButton = false;
        userFactory.getCurrentUser().then(
            function(success) {
                $scope.expenseReport.user = success.data;
            }
        );

        $scope.expenseReport.lineItems = [];

        $scope.save = function() {
            expenseReportFactory.createExpenseReport($scope.expenseReport).then(
                function(success) {
                    $state.go("viewReports", {}, {reload: true})
                },
                function(error) {
                   //console.log("working as intended");
                }
            );

        }

        var nameArray = [];
        $scope.addItem = function() {
            var item = {};
            name = $scope.dropdownvalue.name;
            item.type = $scope.dropdownvalue;
            $scope.showButton = true;
            var arr = $scope.expenseReport.lineItems;
            if(nameArray.indexOf(name) == -1){
                arr.push(item);
                nameArray.push(name)
            }
        }

        $scope.LineItemTypes = LineItemTypes.data;

        $scope.validateDatMoney = function(datMoney) {
            //console.log(datMoney);
        }
    }
]);