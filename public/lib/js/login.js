$(document).ready(function(){
	$("#invalidLoginError").html("");
	var url = window.location.href;
	var error = false;
	if( url.indexOf('error') >= 0){
		error = true;
	}
	if(error){
		$("#invalidLoginError").html("Invalid name and password.");
	}
});

