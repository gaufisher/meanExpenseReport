module.exports = {
  'Project Test' : function (browser) {
    browser    
        .logIn('LDAPUser', '@oxXiS,;AIry\\{8wixuf3;f^?')
        .assert.title('QuickrBooks')
        .navToProject()
        .pause(300)
        .clickCancel()
        .navToProject()
        .makeNewProject()
        .clickSave()
        .navToProject()
        .makeNewProject()
        .clickCancel()
        .end();
  }
};