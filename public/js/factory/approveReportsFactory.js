'use strict';

angular.module('QuickrBooks').factory('approveReportsFactory', ['$http',
    function($http) {
        return {
            getReports: function() {
                return $http.get('/app/approver/submitted-reports');
            },
            getReportById: function(id) {
                return $http.get('/app/approver/submitted-reports/' + id);
            }
        };
    }
]);
