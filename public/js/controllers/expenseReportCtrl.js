app.controller('expenseReportCtrl', ['$scope', '$state', 'expenseReportFactory', 'LineItemTypes', 'userFactory',
    function($scope, $state, expenseReportFactory, LineItemTypes, userFactory){
        $scope.expenseReport = {};
        $scope.showButton = false;
        userFactory.getCurrentUser().then(
            function(success) {
                $scope.expenseReport.user = success.data;
            }
        );

<<<<<<< HEAD
        $scope.expenseReport.lineItems = [];

        $scope.save = function() {
=======
        $scope.expenseReport.items = [];
            
        $scope.persist = function(status){
            $scope.expenseReport.status = status;
>>>>>>> aadfd13bb05d1748717137a48194331248d24019
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
            item.Type = $scope.dropdownvalue.name;
            $scope.showButton = true;
            var arr = $scope.expenseReport.lineItems;
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

        $scope.validateDatMoney = function(datMoney) {
            //console.log(datMoney);
        }
    }
]);
