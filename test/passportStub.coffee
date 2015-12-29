process.env.testRunning = true;
request      = require 'supertest'
app          = require '../app'
should       = require 'should'
passportStub = require 'passport-stub'

passportStub.install app
req = request app

describe 'it should login as random user', (done) ->
  it 'responds with 200', (done) ->
    passportStub.login username: 'gstringfellow'
    req.get '/user/currentuser'
    .end (err,res)->
      console.log res
