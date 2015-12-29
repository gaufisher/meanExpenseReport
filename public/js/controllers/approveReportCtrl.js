'use strict';

angular.module('QuickrBooks').controller('approveReportCtrl', ['$scope', '$state', 'Report', 'expenseReportFactory', 'toastr', '$uibModal', '$window',
    function($scope, $state, Report, expenseReportFactory, toastr, $uibModal, $window) {
        $scope.report = Report;
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
                return;
            }
            if ($scope.report.status === 'saved') {
                $scope.report.rejections.push({reason: $scope.rejectionReason});
            }
            expenseReportFactory.updateExpenseReport($scope.report).then(
                function(success) {
                    expenseReportFactory.sendEmail($scope.report);
                    $state.go('viewReports', {}, {reload: true});
                },
                function(error) {
                    alert('NO!');
                }
            )
        }
        $scope.viewReceiptFile = function(elem) {
            $window.open(elem.receipt.imgPath);
        }
    }
]);
