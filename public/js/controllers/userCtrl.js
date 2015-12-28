app.controller('userCtrl', ['$scope', '$state', 'userFactory',
   function ($scope, $state, userFactory) {
        $scope.user = {};
		$scope.userName = "";

        $scope.setUsername = function () {
            userFactory.getCurrentUser().then(function (success) {
                $scope.userName = success.data.name;
                $scope.userId = success.data._id;
                sharedProperties.setUserId($scope.userId);
            });
        };


        $scope.clearData = function () {
            sharedProperties.setExpenseReport({
                items: []
            });
        };

        $scope.newProject = function () {
            $scope.clearData();
            $state.go("createProject", {}, {
                reload: true
            });
        };

        $scope.newExpenseReport = function () {
            $scope.clearData();
            $state.go("expenseReport", {}, {
                reload: true
            });
        };
	}
]);
