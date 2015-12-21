exports.command = function(lineItem, value, callback){
    var self = this;
    this
        .useCss()
        .setValue('input[id='+lineItem+'InputID', value)
    if(typeof callback === "function") {
        callback.call(self);
    }
    return this;
};