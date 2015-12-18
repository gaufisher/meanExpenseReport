exports.command = function(reportName, callback){
    var self = this;
    this
        .useCss()
        .waitForElementVisible('input[id=inputExpenseReportName]', 1000)
        .setValue('input[id=inputExpenseReportName', reportName)
        .pause(500)
    
    if(typeof callback === "function") {
        callback.call(self);
    }
    return this;
};