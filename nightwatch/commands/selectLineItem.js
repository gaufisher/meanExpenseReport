exports.command = function(lineItem, callback){
    var self = this;
    this
        .useCss()
        .click('select[id=drpdwnvalue]')
        .pause(500)
        .waitForElementVisible('option[label='+lineItem+']', 1000)
        .click('option[label='+lineItem+']')
        .click('body')
        .pause(1000)
        .useXpath()
        .waitForElementVisible('/html/body/div/ui-view/div/div/label[text()="'+lineItem+'"]', 1000)
    if(typeof callback === "function") {
        callback.call(self);
    }
    return this;
};