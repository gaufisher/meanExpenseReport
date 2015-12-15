
app.controller('userCtrl', ['$scope', 'userFactory', 
   function($scope, userFactory){
		$scope.setUsername = function(){
			userFactory.getCurrentUser().then(function(success){
				$scope.userName = success.data.name;
			});
		};
	}                               
]);