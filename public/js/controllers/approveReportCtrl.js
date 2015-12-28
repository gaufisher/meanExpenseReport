'use strict';

angular.module('QuickrBooks').controller('approveReportCtrl', ['$scope', '$state', 'Report', 'expenseReportFactory',
    function($scope, $state, Report, expenseReportFactory) {
        $scope.report = Report;
        console.log(Report);
        $scope.submit = function(status) {
            console.log('Clicked');
            $scope.report.status = status;
			expenseReportFactory.sendEmail($scope.report);
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
