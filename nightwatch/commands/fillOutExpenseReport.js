exports.command = function(reportName, lineItem, value, project, notes, callback){
    var self = this;
    this
        .enterReportName(reportName)
        .selectLineItem(lineItem)
        .enterValueForLineItem(value)
        .selectProject(project)
        .enterNotes(notes)
    
    if(typeof callback === "function") {
        callback.call(self);
    }
    return this;
};