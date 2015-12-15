'use strict';

angular.module('QuickrBooks')
    .controller('projectDeleteCtrl', ['$scope', 'projectFactory', function($scope, projectFactory) {
    $scope.deleteProject = function() {
        if ($scope.projectDeleteSelect !== undefined || $scope.projectDeleteSelect > 0) {
            projectFactory.deleteById($scope.projectDeleteSelect);
        }
    }
}]);