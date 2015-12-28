angular.module('QuickrBooks').controller('projectCreateCtrl',['$scope', '$state', 'projectFactory', 'userFactory', 'toastr', function ($scope, $state, projectFactory, userFactory, toastr) {
    $scope.newProject = {};
	$scope.projectName = "";
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
        var name = $scope.projectName

        projectFactory.create($scope.newProject).then(function(err){
          $scope.result = "Project " + $scope.projectName + " saved.";
          $scope.projectName = "";
        },function(err){
            $scope.result = `Project ${name} already Exsists.`;
        });

        $scope.showButton = false;
        $scope.projectName = "";
    }

    $scope.cancel = function () {
      toastr.pop('error',"Cancelled",`Creating project ${$scope.projectName}`)
      
        $state.go("viewReports", {}, {
            reload: true
        });

    }

}]);
