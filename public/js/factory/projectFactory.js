'use strict';

angular.module('QuickrBooks').factory('projectFactory', ['$http', function($http) {
    return {
        create: function(project) {
            $http.post("/app/projects", project);
        },
        getAll: function() {
            return $http.get("/app/projects");
        }
    };
}]);
