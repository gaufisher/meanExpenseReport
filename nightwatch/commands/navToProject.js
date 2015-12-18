exports.command = function(callback){
    var self = this;
    this
        .useXpath()
        .click("//*[@id='bs-example-navbar-collapse-1']//ul[1]//li[1]//a")
        .pause(1000)
        .waitForElementVisible("//*[@id='bs-example-navbar-collapse-1']//ul[1]//li[1]//ul//li[1]//a", 1000)
        .click("//*[@id='bs-example-navbar-collapse-1']//ul[1]//li[1]//ul//li[1]//a");
    
    if(typeof callback === "function") {
        callback.call(self);
    }
    return this;
};