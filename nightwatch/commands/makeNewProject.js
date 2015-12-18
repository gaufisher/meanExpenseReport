exports.command = function(projectTitle, callback){
    var self = this;
    this
        .useXpath()
        .waitForElementVisible('//html//body//div//ui-view//div//div//div//div[1]//input', 1000)
        .setValue('//html//body//div//ui-view//div//div//div//div[1]//input', projectTitle)
        .pause(500)
        .clickSave()
        .useCss()
        .assert.containsText('h5', 'Project ' + projectTitle + ' saved.')
    if(typeof callback === "function") {
        callback.call(self);
    }
    return this;
};