module.exports = {
  'Login Page Test' : function (browser) {
    browser
      .url('http://localhost:8080/login')
    .waitForElementVisible('body', 1000)
    .assert.title('Login')
    .setValue('input[name=username]', 'LDAPUser')
    .pause(5000)
    .setValue('input[name=password]', '@oxXiS,;AIry\\{8wixuf3;f^?')
    .pause(5000)
    .click('button[type=submit]')
    .pause(1000)
    .assert.title('QuickrBooks')
      .end();
  }
};