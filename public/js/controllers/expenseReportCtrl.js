app.controller('expenseReportCtrl', ['$scope', '$state', 'expenseReportFactory', 'projectFactory', 'LineItemTypes', 'userFactory', 'sharedProperties',
    function ($scope, $state, expenseReportFactory, projectFactory, LineItemTypes, userFactory, sharedProperties) {
        $scope.expenseReport = {};

        $scope.project = {};

        $scope.setExpenseReport = function () {
            $scope.expenseReport = sharedProperties.getExpenseReport();

            $scope.dropdownvalue = {};
            for (var i = 0; i < $scope.expenseReport.items.length; i++) {
                //$scope.expenseReport.items[i].value = ($scope.expenseReport.items[i].value).toFixed(2);
                $scope.dropdownvalue.name = $scope.expenseReport.items[i].type;
                var item = {};
                item.type = $scope.dropdownvalue.name;
                for (var j = 0; j < $scope.LineItemTypes.length; j++) {
                    if ($scope.LineItemTypes[j].name === item.type) {

                        $scope.dropdownvalue = {
                            name: ''
                        };
                        $scope.LineItemTypes.splice(j, 1);
                        break;
                    }
                }
            }
        };
        $scope.showButton = false;
        $scope.expenseReport.items = [];

        var persist = function (status) {
            sharedProperties.setExpenseReport({
                items: []
            });
            $scope.expenseReport.status = status;
            $scope.expenseReport.user = sharedProperties.getUserId();
            for (var i = 0; i < $scope.expenseReport.items.length; i++) {
                if ($scope.expenseReport.items[i].value == null) {
                    $scope.expenseReport.items[i].value = 0.00;
                }
                var datMoney = $scope.expenseReport.items[i].value.toString();
                $scope.expenseReport.items[i].value = datMoney;

            }
            expenseReportFactory.createExpenseReport($scope.expenseReport).then(
                function (success) {
                    $state.go("viewReports", {}, {
                        reload: true
                    })
                },
                function (error) {}
            );
        };

        $scope.save = function () {
            if ($scope.expenseReport.project === undefined || Object.keys($scope.expenseReport.project).length === 0) {
                delete $scope.expenseReport.project;
            }
            console.log($scope.expenseReport);
            persist("saved");
        };

        $scope.submit = function () {
            if ($scope.expenseReport.project != null) {
                persist("submitted");
            }
        };

        $scope.addItem = function () {
            var item = {};
            item.type = $scope.dropdownvalue.name;
            $scope.showButton = true;
            var arr = $scope.expenseReport.items;
            arr.push(item);
            for (var i = 0; i < $scope.LineItemTypes.length; i++) {
                if ($scope.LineItemTypes[i].name === item.type) {
                    $scope.dropdownvalue = {
                        name: ''
                    };
                    $scope.LineItemTypes.splice(i, 1);
                    break;
                }
            }

        }

        $scope.delete = function (index) {
            var lineItem = {};
            lineItem.name = $scope.expenseReport.items[index].type;
            $scope.LineItemTypes.push(lineItem);
            $scope.expenseReport.items.splice(index, 1);
        };

        $scope.cancel = function () {
            sharedProperties.setExpenseReport({
                items: []
            });
            $state.go("viewReports", {}, {
                reload: true
            });
        };

        $scope.LineItemTypes = LineItemTypes.data;

    }
]);
