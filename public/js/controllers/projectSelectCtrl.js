/**
 * Created by Jeremy on 12/7/2015.
 */
app.controller('projectSelectCtrl', ['$scope','getAllProjects', 'sharedProperties', 'projectFactory',
  function($, projects, sharedProperties, projectFactory){
    $.projects = projects.data;

    if($.expenseReport === undefined)
        $.expenseReport = {};
    $.addItem = function(){
      $.expenseReport.project._id = $.dropdownvalue._id;
    };
	$.project = {};
	$.selectProject = function(){
		if(sharedProperties.getExpenseReport().hasOwnProperty('project')){
			console.log("expense report has project property!");
			console.log(sharedProperties.getExpenseReport().project);
			projectFactory.getById(sharedProperties.getExpenseReport().project).then(
				function(success){
					//sharedProperties.setProject(success.data);
					console.log("in project select ctrl, here's the project by id");
					console.log(success.data);
					var project = success.data;
					for(var i = 0; i < $.projects.length; i++)
					{
						if($.projects[i]._id === project._id)
						{
							console.log("got a match!");
							return i;
						}
					}
					//return success.data;
				}
			);
			//$.project = sharedProperties.getProject();
		}
		console.log("here's sharedProperties expense report:");
		console.log(sharedProperties.getExpenseReport());
		
	};
    
  }
]);