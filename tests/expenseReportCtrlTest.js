describe('ExpenseReportController', function(){
    beforeEach(module('QuickrBooks'));

    //this loads a controlller
    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
      }));

/*    describe('$scope.save', function () {
        it ('creates a project with the given scope name', function (){
            var $scope = {};
            var lit = {};
            var controller = $controller ('expenseReportCtrl', { $scope: $scope LineItemTypes:lit });
            $scope.projectName =  "My Project";
            $scope.save();
            expect ($scope.newProject.name).toEqual ("My Project");
        });
    });
*/

    it('creates a expenseReport object on the scope', function(){
        var scope = {};
        var lit = {};
        var controller = $controller('expenseReportCtrl', { $scope: scope,  LineItemTypes:lit});

        expect(scope.expenseReport).not.toBe(null);
    });
    it('creates a lineItems list in the expenseReport object that is on the scope', function(){
        var scope = {};
        var lit = {};
        var controller = $controller('expenseReportCtrl', { $scope: scope,  LineItemTypes:lit});

        expect(scope.expenseReport.lineItems).not.toBe(null);
    });
    it('shows the lineItemtypes', function(){
        var scope = {};
        var lit = {};


        var controller = $controller('expenseReportCtrl', { $scope: scope,  LineItemTypes:lit});

    });
});