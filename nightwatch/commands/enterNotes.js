exports.command = function(notes, callback){
    var self = this;
    this
        .useCss()
        .waitForElementVisible('input[id=notesInput]', 1000)
        .setValue('input[id=inputExpenseReportName', notes)
        .pause(500)
    
    if(typeof callback === "function") {
        callback.call(self);
    }
    return this;
};