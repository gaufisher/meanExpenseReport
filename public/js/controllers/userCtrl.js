
app.controller('userCtrl', ['$scope', 'userFactory', 
   function($scope, userFactory){
	    $scope.user = {};
		
		$scope.setUsername = function(){
			/*userFactory.getCurrentUser().then(function(success){
				$scope.userName = success.data.name;
			});*/
			$scope.user = {
							"_id": "56707a9e2c29fc36bf61955f",
							"name": "dsloane"
						};
			$scope.userName = $scope.user.name;
			$scope.userId = $scope.user._id;
			$scope.userObject = {
				"_id": $scope.userId
			};
		};
	}                               
]);