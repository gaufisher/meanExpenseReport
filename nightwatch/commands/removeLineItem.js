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
        .useCss()
        .waitForElementVisible('label[id='+lineItem+'Label]', 1000)
        .click('span[id='+lineItem+'Delete]')
        .pause(2000)
        .waitForElementVisible('label[id=selectProjectLabel]', 1000)
    if(typeof callback === "function") {
        callback.call(self);
    }
    return this;
};