exports.command = function(reportName, lineItem, value, project, callback){
    var self = this;
    this
        .enterReportName(reportName)
        .selectLineItem(lineItem)
        .enterValueForLineItem(value)
        .selectProject(project)
    
    if(typeof callback === "function") {
        callback.call(self);
    }
    return this;
};