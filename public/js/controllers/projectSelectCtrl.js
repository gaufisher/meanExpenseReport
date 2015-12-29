
/**
 * Created by Jeremy on 12/7/2015.
 */

app.controller('projectSelectCtrl', ['$scope', 'getAllProjects', 'projectFactory',
  function ($, projects, projectFactory) {
        $.projects = projects.data;

        if ($.expenseReport === undefined)
            $.expenseReport = {};

        $.addItem = function () {
            $.expenseReport.project = {};
            if ($.dropdownvalue !== null)
                $.expenseReport.project._id = $.dropdownvalue._id;
        };
        $.selectProject = function () {
            for (var i = 0; i < $.projects.length; i++) {
                if ($.expenseReport.project === $.projects[i]._id) {
                    return i;
                }
            }
        };
  }
]);
