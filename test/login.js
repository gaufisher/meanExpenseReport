var request = require('supertest')
var chai = require('chai')
describe('LoginFunctionality', function(){
  it('gets redirected',function () {
    var user = request.agent('http://localhost:8080');
    user.get('/app').expect(302).end(function (err,res) {
      console.log(err);
      //console.log(res.body);
    })
  })
  it('Logs in', function(){
    var LdapUser = request.agent('http://localhost:8080');
    LdapUser.post('')
         .send({username:'LDAPUser', password:"@oxXiS,;AIry\{8wixuf3;f^?"})
         .expect(200).end(function (err,res) {
           if(err)return console.log(res.body);
           //console.log(res.body);
         })
  })

})
