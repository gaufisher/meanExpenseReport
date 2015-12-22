'use strict';

angular.module('QuickrBooks').factory('approveReportsFactory', ['$http',
    function($http) {
        console.log('approve factory');
        return {
            getReports: function() {
                return $http.get('/app/approver/submitted-reports');
            }
        };
    }
]);
