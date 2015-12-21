module.exports = {
  'Login Page Test' : function (browser) {
    browser
    .url('http://localhost:8080/app/expense-report')
    .pause(1000)
    .assert.title('Login')
    .logIn('fakeUser', 'getWreckedSon')
    .pause(300)
    .assert.title('Login')
    .logIn('LDAPUser', '@oxXiS,;AIry\\{8wixuf3;f^?')
    .pause(300)
    .assert.title('QuickrBooks')
    .end()
  }
};