'use strict';

angular.module('QuickrBooks')
    .controller('projectGetCtrl', ['$scope', 'getAllProjects' ,, function($scope, getAllProjects) {
        $scope.projects = getAllProjects.data;
    }]);
