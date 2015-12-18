module.exports = {
  'Expense Report Test' : function (browser) {
    browser    
        .logIn('LDAPUser', '@oxXiS,;AIry\\{8wixuf3;f^?')
        .assert.title('QuickrBooks')
        .navToExpenseReport()
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