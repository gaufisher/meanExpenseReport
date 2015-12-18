/*
describe('UserController', function() {
    beforeEach(module('QuickrBooks'));

    var $httpBackend, $rootScope, $controller, sharedProperties;

    beforeEach(inject(function(_$rootScope_, _$httpBackend_, _$controller_, _sharedProperties_) {
        $rootScope = _$rootScope_.$new();
        $httpBackend = _$httpBackend_;
        $controller = _$controller_;
        _sharedProperties_ = {
            setUserId: function(){
                return "Id is set";
            }
        }
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('$scope.setUsername', function() {
        it('should fetch authentication user name', function() {
            sharedProperties = _sharedProperties_;
            $controller('userCtrl', { $scope: $rootScope, sharedProperties: sharedProperties });
            $httpBackend.when('GET', '/user/currentuser')
                .respond({data: { "_id": 1, "name": "user" }});
            $rootScope.userId = 2;
            $rootScope.setUsername();
            $httpBackend.flush();
            expect($rootScope.userName).toEqual("user");

        });
    });
});
*/


