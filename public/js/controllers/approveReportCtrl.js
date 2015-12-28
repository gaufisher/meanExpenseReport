'use strict';

angular.module('QuickrBooks').controller('approveReportCtrl', ['$scope', '$state', 'Report', 'expenseReportFactory', 'toastr',
    function($scope, $state, Report, expenseReportFactory, toastr) {
        $scope.report = Report;
        console.log(Report);
        if (Object.keys($scope.report.rejections).length === 0) {
            $scope.report.rejections = [];
        }
        for (var i = 0; i < $scope.report.items.length; i++) {
            $scope.report.items[i].value = $scope.report.items[i].value / 100;
        }
        $scope.submit = function(status) {
            $scope.report.status = status;
            if (status === 'saved' && ($scope.rejectionReason === undefined ||
                                        $scope.rejectionReason === null ||
                                        $scope.rejectionReason.trim() === "")) {
                toastr.error('Must have a reason for rejecting a report', 'Error');
                console.log('You need a reason');
                return;
            }
            if ($scope.report.status === 'saved') {
                $scope.report.rejections.push({reason: $scope.rejectionReason});
            }
            expenseReportFactory.updateExpenseReport($scope.report).then(
                function(success) {
                    $state.go('approveReports', {}, {reload: true});
                },
                function(error) {
                    alert('NO!');
                }
            )
        }
    }
]);
