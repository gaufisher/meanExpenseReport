exports.command = function(notes, callback){
    var self = this;
    this
        .useCss()
        .waitForElementVisible('textarea[id=notesInput]', 1000)
        .setValue('textarea[id=notesInput', notes)
        .pause(500)
    
    if(typeof callback === "function") {
        callback.call(self);
    }
    return this;
};