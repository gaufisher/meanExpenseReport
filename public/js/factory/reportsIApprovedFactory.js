'use strict';

angular.module('QuickrBooks').factory('reportsIApprovedFactory', ['$http',
    function($http) {
        return {
//           getReports: function() {
//                return $http.get('/app/approver/approved-reports');
//            },
            getReportById: function(id) {
                return $http.get('/app/approver/approved-reports/' + id);
            }
        };
    }
]);
