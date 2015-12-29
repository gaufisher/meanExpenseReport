app.controller('userCtrl', ['$scope', '$state', 'userFactory',
   function ($scope, $state, userFactory) {
        $scope.user = {};
		$scope.userName = "";

        $scope.setUsername = function () {
            userFactory.getCurrentUser().then(function (success) {
                $scope.userName = success.data.name;
                $scope.userId = success.data._id;
            });
        };

        $scope.newProject = function () {
            $state.go("createProject", {}, {
                reload: true
            });
        };

        $scope.newExpenseReport = function () {
            $state.go("expenseReport", {}, {
                reload: true
            });
        };
	}
]);
