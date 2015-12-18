app.controller('projectSelectCtrl', ['$scope', 'getAllProjects', 'sharedProperties', 'projectFactory',
  function ($, projects, sharedProperties, projectFactory) {
        $.projects = projects.data;

        if ($.expenseReport === undefined)
            $.expenseReport = {};

        $.addItem = function () {
            $.expenseReport.project = {};
            if ($.dropdownvalue !== null)
                $.expenseReport.project._id = $.dropdownvalue._id;
        };
        $.project = {};
        $.selectProject = function () {
            if (sharedProperties.getExpenseReport().hasOwnProperty('project')) {
                return sharedProperties.getProjectId();
            }
        };

  }
]);
