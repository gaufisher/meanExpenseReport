exports.command = function(callback){
    var self = this;
    this
        .useCss()
        .click('a[id=createNavbarDropdown]')
        .pause(1000)
        .waitForElementVisible('a[id=expenseReportNavbarLink]', 1000)
        .click('a[id=expenseReportNavbarLink]');
    
    if(typeof callback === "function") {
        callback.call(self);
    }
    return this;
};