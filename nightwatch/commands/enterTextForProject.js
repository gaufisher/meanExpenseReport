exports.command = function(projectTitle, callback){
    var self = this;
    this
        .useCss()
        .waitForElementVisible('input[class=projectInput]', 1000)
        .setValue('input[class=projectInput]', projectTitle)
        .pause(500)
    if(typeof callback === "function") {
        callback.call(self);
    }
    return this;
};