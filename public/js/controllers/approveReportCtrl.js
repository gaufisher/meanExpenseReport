'use strict';

angular.module('QuickrBooks').controller('approveReportCtrl', ['$scope', '$state', 'Report',
    function($scope, $state, Report) {
        $scope.report = Report;
        console.log(Report);
        $scope.submit = function(status) {
            //post it
        }
    }
]);
