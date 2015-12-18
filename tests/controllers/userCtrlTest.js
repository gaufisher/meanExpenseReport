/*
describe('UserController', function() {
    beforeEach(module('QuickrBooks'), function($provide) {
        $provide.value();
    });

    var q, deffered, $httpBackend, $rootScope, $controller, sharedPropertiesMock, userFactory;

    beforeEach(function() {
        sharedPropertiesMock = {
            setUserId: function(id) {
                console.log("Id: " + id + " is set.");
            }
        };

        userFactory = {
            data: {"_id": 1, "name": "user"},
            getCurrentUser: function() {
                deffered = q.defer();
                return deffered.promise;
            }
        };
    });

    beforeEach(inject(function(_$rootScope_, _$httpBackend_, _$controller_, $q) {
        $rootScope = _$rootScope_.$new();
        $httpBackend = _$httpBackend_;
        $controller = _$controller_;
        q = $q;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('$scope.setUsername', function() {
        it('should fetch authentication user name', function() {
            $controller('userCtrl', { $scope: $rootScope, userFactory: userFactory, sharedProperties: sharedPropertiesMock });
           // spyOn(userFactory, 'getCurrentUser').andCallThrough();
            $rootScope.userId = 2;
            $rootScope.setUsername();
            deffered.resolve();
            $rootScope.$root.$digest();
            expect(peopleService.getCurrentUser).toHaveBeenCalled();
          /*  $httpBackend.when('GET', '/user/currentuser')
                .respond({data: { "_id": 1, "name": "user" }});*/
          /*  $rootScope.userId = 2;
            $rootScope.setUsername();*/
            //$httpBackend.flush();
            //expect($rootScope.userName).toEqual("user");
           

 /*       });
    });
});*/



