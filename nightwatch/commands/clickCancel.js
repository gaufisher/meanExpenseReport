exports.command = function(callback){
    var self = this;
    this
        .pause(1000)
        .useCss()
        .click('button[id=cancel]')
        .pause(1000)
        .assert.containsText('h2', 'Expense Reports')
    
    if(typeof callback === "function") {
        callback.call(self);
    }
    return this;
};