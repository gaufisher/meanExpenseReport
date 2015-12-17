/**
 * Created by Jeremy on 12/7/2015.
 */
app.controller('projectSelectCtrl', ['$scope','getAllProjects', 'sharedProperties',
  function($, projects, sharedProperties){
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
			$.project = sharedProperties.getProject();
		}
		console.log($.project);
		console.log(sharedProperties.getExpenseReport());
		return $.project;
	};
    
  }
]);