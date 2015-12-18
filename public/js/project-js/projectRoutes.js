'use strict';

angular.module('QuickrBooks').config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/createProject');

    $stateProvider

    /* Code starts (Use the code below as the state for the creating new project page) */

    /* Code ends */

    /* This code is for demo purposes only, for populating the project drop down
     in the creating new expense report form or page. */
        .state('getProject', {
        url: '/getProject',
        templateUrl: '/project-partials/getProjectDemo.tpl.html',
        controller: 'projectGetCtrl',
        resolve: {
            getAllProjects: function (projectFactory) {
                return projectFactory.getAll();
            }
        }
    });


});
