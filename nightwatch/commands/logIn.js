exports.command = function(user, password, callback){
    var self = this;
    this
        .url('http://localhost:8080/')
        .useCss()
        .waitForElementVisible('body', 200)
        .assert.title('Login')
        .setValue('input[name=username]', user)
        .pause(200)
        .setValue('input[name=password]', password)
        .pause(200)
        .click('button[type=submit]')
        .pause(200)
    
        if(typeof callback === "function") {
        callback.call(self);
    }
    return this;
};