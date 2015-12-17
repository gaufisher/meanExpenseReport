'use strict';

angular.module('QuickrBooks').factory('projectFactory', ['$http', function($http) {
    return {
        create: function(project) {
            $http({
                method: 'POST',
                url: "/project",
                data: project
            });
        },
        getAll: function() {
            return $http({
            method: 'GET',
            url: "/project"
            });
        },
        deleteById: function(id) {
            $http({
                method: 'DELETE',
                url: "/project/" + id
            });
        },
		getById: function(id){
			return $http.get("/project/" + id);
		}
    };
}]);
