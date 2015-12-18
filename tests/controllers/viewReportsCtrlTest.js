describe('ViewReportsController', function() {
    beforeEach(module('QuickrBooks'));

    var $controller;

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    describe('$scope.reports', function() {
        it('should attach a list of data projects', function() {
            var $scope = {};
            var reports = {data: [ {"_id": 1, "name": "Report 1"}, {"_id": 2, "name": "Report 2"} ] };
            var controller = $controller('viewReportsCtrl', { $scope: $scope, ExpenseReports: reports });

            expect($scope.reports.length).toBe(2);
            expect($scope.reports[0].name).toEqual("Report 1");
        });
    });

});