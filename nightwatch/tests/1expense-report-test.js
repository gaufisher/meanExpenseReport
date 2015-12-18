module.exports = {
  'Expense Report Test' : function (browser) {
    browser    
        .logIn('LDAPUser', '@oxXiS,;AIry\\{8wixuf3;f^?')
        .assert.title('QuickrBooks')
        .navToExpenseReport()
        .removeLineItem('Other')
        .fillOutExpenseReport("Nightwatch1", "Mileage", "1352", "KCLS", "Test Notes")
        .clickSave()
        .assert.containsText('h2', 'Expense Reports')
        .navToExpenseReport()
        .fillOutExpenseReport("Nightwatch2", "Lodging", "2153", "KCLS", "Test Notes")
        .clickSubmit()
        .assert.containsText('h2', 'Expense Reports')
        .navToExpenseReport()
        .clickCancel()
        .end();
  }
};