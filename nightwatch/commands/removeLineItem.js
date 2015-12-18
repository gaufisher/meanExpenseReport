exports.command = function(lineItem, callback){
    var self = this;
    this
        .pause(500)
        .useCss()
        .click('select[id=drpdwnvalue]')
        .pause(500)
        .waitForElementVisible('option[label='+lineItem+']', 1000)
        .click('option[label='+lineItem+']')
        .click('body')
        .pause(2000)
        .useXpath()
        .waitForElementVisible('/html/body/div/ui-view/div/div/label[text()="'+lineItem+'"]', 1000)
        .click('/html/body/div/ui-view/div/div[3]/div/span')
        .pause(2000)
        .waitForElementVisible('/html/body/div/ui-view/div/div[3]/div/label[text()="Select a Project"]', 1000)
    if(typeof callback === "function") {
        callback.call(self);
    }
    return this;
};