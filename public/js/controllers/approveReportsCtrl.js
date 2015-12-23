'use strict';

angular.module('QuickrBooks').controller('approveReportsCtrl', ['$scope', '$state', 'approveReportsFactory', 'Reports',
    function($scope, $state, apprFactory, Reports) {
        $scope.reports = Reports;

        $scope.goToReport = function(id) {
            //console.log(id);
            $state.go('approveReport', {id: id});
        }
    }
]);
