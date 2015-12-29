
angular.module('QuickrBooks').controller('projectCreateCtrl',['$scope', '$state', 'projectFactory', 'userFactory', 'toaster', function ($scope, $state, projectFactory, userFactory, toaster) {
    $scope.newProject = {};
	$scope.projectName = "";

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
            $scope.showButton = false;
            toaster.pop('success',"Created",`${$scope.projectName}`);

            $scope.projectName = "";
            $state.go("viewReports", {}, {
                reload: true
            });
        },function(err){
            toaster.pop('error',"Error",`Creating project ${$scope.projectName}`)
        });


    }

    $scope.cancel = function () {
      toaster.pop('error',"Cancelled",`Creating project ${$scope.projectName}`)
        $state.go("viewReports", {}, {
            reload: true
        });

    }

}]);
