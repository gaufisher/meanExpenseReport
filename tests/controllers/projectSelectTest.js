describe('ProjectSelectController', function(){
    beforeEach(module('QuickrBooks'));

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
      }));

    it('sets the project id of an expense report', function(){
        var scope = {};
        var projects = {}; 
        var controller = $controller('projectSelectCtrl', { $scope: scope, getAllProjects: projects });
        scope.dropdownvalue = {"_id": 1};

        scope.addItem();
        expect(scope.expenseReport.project._id).toEqual(scope.dropdownvalue._id);
    });
});