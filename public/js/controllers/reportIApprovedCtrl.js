'use strict';

angular.module('QuickrBooks').controller('reportIApprovedCtrl', ['$scope', '$state', 'ApprovedReport', 'reportsIApprovedFactory',
    function($scope, $state, ApprovedReport, reportsIApprovedFactory) {
        $scope.report = ApprovedReport;
    }
]);
