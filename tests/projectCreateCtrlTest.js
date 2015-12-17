describe ('ProjectCreateController', function () {
    beforeEach (module ('QuickrBooks'));

    //this loads a controlller
    beforeEach (inject (function (_$controller_) {
        $controller = _$controller_;
      }));

    it ('creates a project object on the scope', function (){
        var scope = {};
        var controller = $controller ('projectCreateCtrl', { $scope: scope });

        expect (scope.newProject).not.toBe (null);
    });

});