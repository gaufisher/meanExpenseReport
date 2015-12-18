describe('ProjectCreateController', function() {
    beforeEach(module('QuickrBooks'));

    var $controller;
    var $state;

    beforeEach(inject(function (_$controller_, _$state_) {
        $controller = _$controller_;
        $state = _$state_;
        spyOn($state, 'go');
      }));

    describe('$scope.saveProject', function () {
        it('creates a project with the given scope name', function(){
            var $scope = {};
            $controller('projectCreateCtrl', { $scope: $scope });
            $scope.projectName =  "My Project";
            $scope.saveProject();
            expect($scope.newProject.name).toEqual("My Project");
        });
    });

    describe('$scope.clearResult', function() {
        it('clears the scope result', function(){
            var $scope = {};
            $controller('projectCreateCtrl', { $scope: $scope });
            $scope.result =  "My Project";
            $scope.clearResult();
            expect($scope.result).toEqual("");
        });
    });

    describe('$scope.textInput', function() {
        it('validates the project name to be valid and show save button', function(){
            var $scope = {};
            $controller('projectCreateCtrl', { $scope: $scope });
            $scope.projectName =  "My Project";
            $scope.textInput();
            expect($scope.showButton).toBeTruthy();
        });
    });

    describe('$scope.textInput', function() {
        it('validates the project name to be invalid and hide save button', function(){
            var $scope = {};
            $controller('projectCreateCtrl', { $scope: $scope });
            $scope.projectName =  "My%Project";
            $scope.textInput();
            expect($scope.showButton).toBeFalsy();
        });
    });

    describe('$scope.cancel', function() {
        it('redirects to the view report page', function(){
            var $scope = {};
            $controller('projectCreateCtrl', { $scope: $scope });
            $scope.cancel();
            expect($state.go).toHaveBeenCalledWith("viewReports", {}, {reload: true});
        });
    });

});