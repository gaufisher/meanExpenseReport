angular.module('QuickrBooks').controller('projectCreateCtrl', ['$scope', '$state', 'projectFactory', 'userFactory','toaster', function ($scope, $state, projectFactory, userFactory,toaster) {
    $scope.newProject = {};

    /* Clears the project save message */
    $scope.clearResult = function () {
        if ($scope.result !== undefined || $scope.result !== "") {
            $scope.result = "";
        }
    }

    /* Shows the save button only if project name is valid. */
    $scope.textInput = function () {
        var namePattern = new RegExp("^[a-zA-Z0-9\-_ ]{1,255}$");

        if ($scope.projectName !== undefined) {
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
        toaster.pop('success',"Created",`${$scope.projectName}`)
        $scope.projectName = "";
        $state.go("viewReports", {}, {
            reload: true
        });
    }

    $scope.cancel = function () {
        $state.go("viewReports", {}, {
            reload: true
        });
    }

}]);
