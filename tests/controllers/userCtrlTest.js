
describe('UserController', function() {
    beforeEach(module('QuickrBooks'));

    var $httpBackend, $rootScope, $controller;

    beforeEach(inject(function(_$rootScope_, _$httpBackend_, _$controller_) {
        $rootScope = _$rootScope_.$new();
        $httpBackend = _$httpBackend_;
        $controller = _$controller_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('$scope.setUsername', function() {
        it('should fetch authentication user name', function() {
            $controller('userCtrl', { $scope: $rootScope });
            $httpBackend.when('GET', '/user/currentuser')
                .respond({ "_id": 1, "name": "user" });
            
            $rootScope.setUsername();
            $httpBackend.flush();
            expect($rootScope.userName).toEqual("user");

        });
    });
});



