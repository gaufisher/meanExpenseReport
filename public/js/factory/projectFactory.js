'use strict';

angular.module('QuickrBooks').factory('projectFactory', ['$http', function($http) {
    return {
        create: function(project) {
            $http.post("/projects", project);
        },
        getAll: function() {
            return $http.get("/projects");
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
