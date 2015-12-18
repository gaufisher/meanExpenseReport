//*[@id="bs-example-navbar-collapse-1"]/ul[3]/li[2]/a

exports.command = function(user, password, callback){
    var self = this;
    this
        .useXpath()
        .click('//*[@id="bs-example-navbar-collapse-1"]/ul[3]/li[2]/a')
        .pause(1000)
    
        if(typeof callback === "function") {
        callback.call(self);
    }
    return this;
};
//*[@id="bs-example-navbar-collapse-1"]/ul[2]/li[2]/a