exports.command = function(projectTitle, callback){
    var self = this;
    this
        .useCss()
        .waitForElementVisible('input[id=projectInputField]', 1000)
        .setValue('input[id=projectInputField]', projectTitle)
        .pause(500)
    if(typeof callback === "function") {
        callback.call(self);
    }
    return this;
};