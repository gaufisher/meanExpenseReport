'use strict';

angular.module('QuickrBooks').controller('approveReportCtrl', ['$scope', '$state',
    function($scope, $state, $stateParams) {
        console.log($state.params.report);
        $scope.report = $state.params.report;
    }
]);
