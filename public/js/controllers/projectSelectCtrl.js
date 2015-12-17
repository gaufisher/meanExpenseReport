/**
 * Created by Jeremy on 12/7/2015.
 */
app.controller('projectSelectCtrl', ['$scope','getAllProjects', 'sharedProperties', 'projectFactory',
  function($, projects, sharedProperties, projectFactory){
    $.projects = projects.data;

    if($.expenseReport === undefined)
        $.expenseReport = {};
    $.expenseReport.project = {};
    $.addItem = function(){
      $.expenseReport.project._id = $.dropdownvalue._id;
    };
	$.project = {};
	$.selectProject = function(){
		console.log("wheeee!");
		if(sharedProperties.getExpenseReport().hasOwnProperty('project')){
			console.log("expense report has project property!");
			console.log(sharedProperties.getExpenseReport().project);
			projectFactory.getById(sharedProperties.getExpenseReport().project._id).then(
				function(success){
					sharedProperties.setProject(success.data);
					//console.log($scope.project);
				}
			);
			$.project = sharedProperties.getProject();
		}
		console.log($.project);
		console.log("here's sharedProperties expense report:");
		console.log(sharedProperties.getExpenseReport());
		return $.project;
	};
    
  }
]);