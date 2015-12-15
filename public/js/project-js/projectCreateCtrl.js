
angular.module('QuickrBooks').controller('projectCreateCtrl', ['$scope', '$resource', 'projectFactory', function($scope, $resource, projectFactory) {
    $scope.newProject = {};
  /*  userFactory.getCurrentUser().then(
        function(success) {
            $scope.newProject.approver = success.data;
        }
    );*/

    /* Clears the project save message */
    $scope.clearResult = function () {
        if ($scope.result !== undefined || $scope.result !== "") {
            $scope.result = "";
        }
    }

    /* Shows the save button only if project name is valid. */
    $scope.textInput = function () {
        var namePattern = new RegExp("^[a-zA-Z0-9\-_ ]{1,25}$");

        if($scope.projectName !== undefined) {
            if (namePattern.test($scope.projectName)) {
                $scope.showButton = true;
            } else {
                $scope.showButton = false;
            }
        }
    }
    var Project = $resource('/project');

    $scope.saveProject = function () {
        var project = new Project();
        project.name = $scope.projectName;
        project.$save(function (result) {
            $scope.newProject = result;
            $scope.showButton = false;
            $scope.result = "Project " + $scope.projectName + " saved.";
            $scope.projectName = "";
        });
        
    }

}]);
