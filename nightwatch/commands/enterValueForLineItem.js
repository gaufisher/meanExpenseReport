exports.command = function(value, callback){
    var self = this;
    this
        .useXpath()
        .setValue('/html/body/div/ui-view/div/div[3]/div/input', value)
    if(typeof callback === "function") {
        callback.call(self);
    }
    return this;
};