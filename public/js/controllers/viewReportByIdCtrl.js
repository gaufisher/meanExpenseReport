'use strict';

angular.module('QuickrBooks').controller('viewReportByIdCtrl', ['$scope', 'Report', 'LineItemTypes', 'expenseReportFactory', '$state', 'projectFactory', 'getAllProjects',
    function($scope, Report, LineItemTypes, expenseReportFactory, $state, projectFactory, getAllProjects) {
        $scope.expenseReport = Report;
        $scope.LineItemTypes = LineItemTypes.data;
        $scope.hasProject = true;
        $scope.setExpenseReport = function () {
            for (var i = 0; i < $scope.expenseReport.items.length; i++)
            console.log($scope.expenseReport.items[i].value);
            if ($scope.expenseReport.hasOwnProperty('items')) {
                for (var i = 0; i < $scope.expenseReport.items.length; i++) {
                    $scope.expenseReport.items[i].value = $scope.expenseReport.items[i].value / 100;
                }
            }
            $scope.dropdownvalue = {};
			if($scope.expenseReport.items.length > 0)
			{
				$scope.showButton = true;
			}
            for (var i = 0; i < $scope.expenseReport.items.length; i++) {
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
        var persist = function (status) {
            $scope.expenseReport.status = status;
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
                    });

                },
                function (error) {}
            );
        };

        var updateReport = function () {
            expenseReportFactory.updateExpenseReport($scope.expenseReport).then(
                function (success) {
                    $state.go("viewReports", {}, {
                        reload: true
                    });
                },
                function (error) {
                    //console.log("working as intended");
                }
            );
        };

        $scope.save = function () {
            console.log($scope.expenseReport);
			if ($scope.expenseReport.project === undefined || Object.keys($scope.expenseReport.project).length === 0) {
				delete $scope.expenseReport.project;
			}
            if ($scope.expenseReport.hasOwnProperty('status')) {
                updateReport();
            } else {
                persist("saved");
            }
            $state.go("viewReports", {}, {
                reload: true
            })
        };

        $scope.submit = function () {
			if ($scope.expenseReport.project === undefined || Object.keys($scope.expenseReport.project).length === 0) {
                delete $scope.expenseReport.project;
            }
            if ($scope.expenseReport.project != null) {
 			    if ($scope.expenseReport.hasOwnProperty('status')) {
                    $scope.expenseReport.status = "submitted";
                    updateReport();
                } else {
                    persist("submitted");
                }
                $state.go("viewReports", {}, {
                    reload: true
                });
            } else {
                $scope.hasProject = false;
            }

        };

        $scope.unsubmit = function (reportId) {
            $scope.expenseReport.status = "saved";
            console.log($scope.unsubmitReason);
            $scope.expenseReport.unsubmitReasons.push({date: new Date(), notes: $scope.unsubmitReason});
            expenseReportFactory.updateExpenseReport($scope.expenseReport).then(
                function (success) {
                    $state.go("viewReport", {id: reportId}, {
                        reload: true
                    });
                },
                function (error) {
                    //console.log("working as intended");
                }
            );
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
            //To Do: remove the line item when I press delete
            $scope.expenseReport.items.splice(index, 1);
            $scope.showButton = $scope.expenseReport.items.length < 1 ? false : true;
        };

        $scope.cancel = function () {
            $state.go("viewReports", {}, {
                reload: true
            });
        };
    }
]);
