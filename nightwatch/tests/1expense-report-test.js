module.exports = {
  'Expense Report Test' : function (browser) {
    browser    
        .logIn('LDAPUser', '@oxXiS,;AIry\\{8wixuf3;f^?')
        .assert.title('QuickrBooks')
        .navToExpenseReport()
        .removeLineItem('Other')
        .fillOutExpenseReport("UNIQUE NAMEioawje", "Mileage", "1352", "KCLS", "Test Notes")
        .clickSave()
        .useXpath()
        .waitForElementVisible('//*[@id="savedTable"]/tbody/tr/td[text()="UNIQUE NAMEioawje"]', 1000)
        .navToExpenseReport()
        .fillOutExpenseReport("UNIQUE NAMEwerwer", "Lodging", "2153", "KCLS", "Test Notes")
        .clickSubmit()
        .useXpath()
        .waitForElementVisible('//*[@id="submittedTable"]/tbody/tr/td[text()="UNIQUE NAMEwerwer"]', 1000)
        .navToExpenseReport()
        .clickCancel()
        .end();
  }
};