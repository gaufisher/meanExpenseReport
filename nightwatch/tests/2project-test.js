module.exports = {
  'Project Test' : function (browser) {
    browser    
        .logIn('LDAPUser', '@oxXiS,;AIry\\{8wixuf3;f^?')
        .assert.title('QuickrBooks')
        .navToProject()
        .pause(300)
        .fillOutExpenseReport()
        .clickSave()
        .navToExpenseReport()
        .fillOutExpenseReport()
        .clickSubmit()
        .navToExpenseReport()
        .clickCancel()
        .end();
  }
};