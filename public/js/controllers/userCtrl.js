
app.controller('userCtrl', ['$scope', '$state', 'userFactory', 'sharedProperties',
   function($scope, $state, userFactory, sharedProperties){
	    $scope.user = {};
		
		$scope.setUsername = function(){
			userFactory.getCurrentUser().then(function(success){
				$scope.userName = success.data.name;
				$scope.userId = success.data._id;
				sharedProperties.setUserId($scope.userId);
				
			});
			/*$scope.user = {
							"_id": "56707a9e2c29fc36bf61955f",
							"name": "dsloane"
						};
			$scope.userId = $scope.user._id;
			$scope.userObject = {
				"_id": $scope.userId
			};*/
		};
		
		$scope.clearData = function(){
			sharedProperties.setExpenseReport({items:[]});
		};
		
		$scope.newProject = function(){
			$scope.clearData();
			$state.go("createProject", {}, {reload: true});
		};
		
		$scope.newExpenseReport = function(){
			$scope.clearData();
			$state.go("expenseReport", {}, {reload: true});
		};
	}                               
]);