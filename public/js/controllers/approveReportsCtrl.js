'use strict';

angular.module('QuickrBooks').controller('approveReportsCtrl', ['$scope', 'approveReportsFactory', 'Reports',
    function($scope, apprFactory, Reports) {
        $scope.reports = Reports;
    }
]);
