app.controller('expenseReportCtrl', ['$scope', '$state', 'expenseReportFactory', 'LineItemTypes', 'userFactory',
    function($scope, $state, expenseReportFactory, LineItemTypes, userFactory){
        $scope.expenseReport = {};
        $scope.showButton = false;
        userFactory.getCurrentUser().then(
            function(success) {
                $scope.expenseReport.user = success.data;
            }
        );

        $scope.expenseReport.items = [];
            
        var persist = function(status){
            $scope.expenseReport.status = status;
            expenseReportFactory.createExpenseReport($scope.expenseReport).then(
                function(success) {
                    $state.go("viewReports", {}, {reload: true})
                },
                function(error) {
                   //console.log("working as intended");
                }
            );
        }
        
        $scope.save = function(){
            console.log($scope.expenseReport.project);
            if(Object.keys($scope.expenseReport.project).length == 0){
            delete $scope.expenseReport.project;
            }
            console.log($scope.expenseReport);
            persist("saved");
        }
        
        $scope.submit = function(){
            if($scope.expenseReport.project != null) {
                persist("submitted");   
            }
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

        $scope.validateDatMoney = function(datMoney) {
            //console.log(datMoney);
        }
    }
]);
