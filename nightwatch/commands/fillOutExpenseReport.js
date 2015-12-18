exports.command = function(callback){
    var self = this;
    this
        .useCss()
        .waitForElementVisible('input[id=inputExpenseReportName]', 1000)
        .setValue('input[id=inputExpenseReportName', 'NightwatchTest')
        .pause(500)
        .click('select[id=drpdwnvalue]')
        .pause(500)
        .click('option[label=Mileage]')
        .click('body')
        .pause(1000)
        .useXpath()
        .setValue('/html/body/div/ui-view/div/div[3]/input', '1235')
        .useCss()
        .click('select[id=selectDropdown]')
        .click('option[label=KCLS]')
        .pause(500)
        .click('body')
    
    if(typeof callback === "function") {
        callback.call(self);
    }
    return this;
};