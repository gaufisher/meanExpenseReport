'use strict';

angular.module('QuickrBooks').controller('approveReportsCtrl', ['$scope', 'approveReportsFactory', 'Reports',
    function($scope, apprFactory, Reports) {
        console.log('Approve controller');
        $scope.reports = Reports;
    }
]);
