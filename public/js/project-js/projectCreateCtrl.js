
angular.module('QuickrBooks').controller('projectCreateCtrl', ['$scope', 'projectFactory', 'userFactory', function($scope, projectFactory, userFactory) {
    $scope.newProject = {};
    userFactory.getCurrentUser().then(
        function(success) {
            $scope.newProject.approver = success.data;
        },
        function(error) {
           $scope.newProject.approver = null;
        }
    );

    /* Clears the project save message */
    $scope.clearResult = function () {
        if ($scope.result !== undefined || $scope.result !== "") {
            $scope.result = "";
        }
    }

    /* Shows the save button only if project name is valid. */
    $scope.textInput = function () {
        var namePattern = new RegExp("^[a-zA-Z0-9\-_ ]{1,255}$");

        if($scope.projectName !== undefined) {
            if (namePattern.test($scope.projectName)) {
                $scope.showButton = true;
            } else {
                $scope.showButton = false;
            }
        }
    }

    $scope.saveProject = function () {
        $scope.newProject.name = $scope.projectName;
        projectFactory.create($scope.newProject);

        $scope.showButton = false;
        $scope.result = "Project " + $scope.projectName + " saved.";
        $scope.projectName = "";
    }

}]);
