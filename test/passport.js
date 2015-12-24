passportStub = require 'passport-tub'
request      = require 'supertest'
app          = require '../app'

passportStub.install app
req = request app

describe 'GET /admin', ->

  it 'responds with 401 if not logged in', (done) ->
    req.get('/admin').expect(401).end done

  it 'responds with 200 when logged in', (done) ->
    passportStub.login username: 'john.doe'
    req.get('/admin').expect(200).end done
