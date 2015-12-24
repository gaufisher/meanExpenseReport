'use strict';

angular.module('QuickrBooks').controller('approveReportCtrl', ['$scope', '$state', 'Report', 'expenseReportFactory', 'toastr',
    function($scope, $state, Report, expenseReportFactory, toastr) {
        $scope.report = Report;
        console.log(Report);
        $scope.submit = function(status) {
            $scope.report.status = status;
            if (status === 'denied' && ($scope.rejectionReason === undefined ||
                                        $scope.rejectionReason === null ||
                                        $scope.rejectionReason.trim() === "")) {
                toastr.error('Must have a reason for rejecting a report', 'Error')
                console.log('You need a reason');
                return;
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
