
angular.module('QuickrBooks').factory('userFactory', ['$http', 
   function($http) {
    return {
    	getCurrentUser: function(){
    		return $http.get('/user/currentuser');
			
    	}
    	
    };
}]);