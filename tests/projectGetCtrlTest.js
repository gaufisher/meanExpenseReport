describe('ProjectGetController', function() {
    beforeEach(module('QuickrBooks'));

    var $controller;

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    describe('$scope.projects', function() {
        it('should attach a list of data projects', function() {
            var $scope = {};
            var projects = {data: [ {"_id": 1, "approver": 1, "name": "Project 1"}, {"_id": 2, "approver": 2, "name": "Project 2"} ] };
            var controller = $controller('projectGetCtrl', { $scope: $scope, getAllProjects: projects });

            expect($scope.projects.length).toBe(2);
            expect($scope.projects[0].name).toEqual("Project 1");
        });
    });

});