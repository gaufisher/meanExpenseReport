
describe("ProjectFactory", function () {
     beforeEach(module('QuickrBooks'));

    var $scope, $httpBackend, $controller, projectFactory;

    beforeEach(inject(function(_$rootScope_, _$httpBackend_, _projectFactory_) {
        $scope = _$rootScope_.$new();
        $httpBackend = _$httpBackend_;
        projectFactory = _projectFactory_;
    }));

    describe('projectFactory.getAll()', function() {
        it("should return a list of projects", (function() {
            $httpBackend.expectGET('/app/projects').respond([ {"_id": 1, "approver": 1, "name": "Project 1"}, {"_id": 2, "approver": 2, "name": "Project 2"} ]);
            var result = projectFactory.getAll();
            $httpBackend.flush();
            expect(result).toEqual([ {"_id": 1, "approver": 1, "name": "Project 1"}, {"_id": 2, "approver": 2, "name": "Project 2"} ]);
        }));
    });
});*/
describe('ProjectFactory', function() {
     beforeEach(module('QuickrBooks'));
  var LanguagesServicePromise, 
    $httpBackend, 
    jsonResponse = [{"name":"en"}, {"name":"es"}, {"name":"fr"}];

  beforeEach(function(){
    module('plunker');
    inject(function($injector){
      LanguagesServicePromise = $injector.get('LanguagesServicePromise');
      // set up the mock http service
      $httpBackend = $injector.get('$httpBackend');

      // backend definition response common for all tests
      $httpBackend.whenGET('languages.json')
        .respond( jsonResponse );
    });
  });

  it('should return available languages', function(done) {
    // service returns a promise
    var promise = LanguagesServicePromise.get();
    // use promise as usual
    promise.then(function(languages){
      // same tests as before
      expect(languages).toContain('en');
      expect(languages).toContain('es');
      expect(languages).toContain('fr');
      expect(languages.length).toEqual(3);
      // Spec waits till done is called or Timeout kicks in
      done();
    });
    // flushes pending requests
    $httpBackend.flush();
  });
});

/*
describe('ProjectFactory', function() {
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