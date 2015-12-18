exports.command = function(callback){
    var self = this;
    this
        .useCss()
        .click('button[id=submit]')
        .pause(1000)
    
    if(typeof callback === "function") {
        callback.call(self);
    }
    return this;
};