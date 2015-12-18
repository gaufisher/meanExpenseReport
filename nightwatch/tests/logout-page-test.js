module.exports = {
  'Logout Page Test' : function (browser) {
    browser
    .url('http://localhost:8080/app/expense-report')
    .logIn('LDAPUser', '@oxXiS,;AIry\\{8wixuf3;f^?')
    .pause(3000)
    .logOut()
    .assert.title('Login')
    .end()
  }
};