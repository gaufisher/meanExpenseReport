'use strict';

angular.module('QuickrBooks').factory('projectFactory', ['$http', function($http) {
    return {
        create: function(project) {
            $http.post("/app/projects", project);
        },
        getAll: function() {

            return $http.get("app/projects");
        },
        deleteById: function(id) {
            $http({
                method: 'DELETE',
                url: "app/project/" + id
            });
        },
		getById: function(id){
			return $http.get("app/project/" + id);
		}
    };
}]);
