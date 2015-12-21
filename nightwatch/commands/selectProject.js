exports.command = function(project, callback){
    var self = this;
    this        
        .useCss()
        .click('select[id=selectDropdown]')
        .click('option[label='+project+']')
        .pause(500)
        .click('body')
    
        if(typeof callback === "function") {
        callback.call(self);
    }
    return this;
};