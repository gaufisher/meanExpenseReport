process.env.testRunning = true;
request      = require 'supertest'
app          = require '../app'
should         = require 'should'
req = request.agent app

describe 'should not login to the app', ->

  it '/app responds with 302 if not logged in', (done) ->
    req.get('/app').expect(302).end done

  it '/app redirects to / if not logged in', (done) ->
    req.get '/app'
    .expect 302
    .end (err,res) ->
      should.not.exist err
      should.exist res
      res.should.have.property 'header'
      .which.has.property 'location','/'
      done()
  it '/{randomURL} redirects to / if not logged in', (done) ->
    req.get '/asdg3f4t'
    .expect 302
    .end (err,res) ->
      should.not.exist err
      should.exist res
      res.should.have.property 'header'
      .which.has.property 'location','/'
      done()

  it '/ responds with 200 if not logged in', (done) ->
      req.get('/').expect(200).end done

describe 'it logs in to the app', ->

  it 'responds with 302 when logged in', (done) ->
    req.post '/'
    .send username: 'LDAPUser', password:"@oxXiS,;AIry\\{8wixuf3;f^?"
    .expect 302
    .end (err,res) ->
      should.not.exist err
      should.exist res
      done()

  it 'does not get redirected to the login page', (done) ->
    req.get '/app'
    .expect 200
    .end (err,res) ->
      should.not.exist err
      should.exist res
      res.should.have.property 'headers'
      .which.should.not.have.property 'location'
      done()

  it 'redirects to the app', (done) ->
    req.get '/'
    .expect 302
    .end (err,res) ->
      should.not.exist err
      should.exist res
      res.should.have.property 'header'
      .which.has.property 'location','/app'
      done()

  it 'responds with the name of the user that is logged in', (done) ->
    req.get '/user/currentuser'
    .expect 200
    .end (err,res)->
      should.not.exist err
      should.exist res
      res.should.have.property 'body'
      .which.has.keys 'name','_id'
      res.body.should.have.property 'name','LDAPUser'
      do done
  it 'logs-out when a get is performed on /logout', (done) ->
    req.get '/logout'
    .expect 302
    .end (err1,res1)->
      should(err1).be.null()
      should(res1).not.be.null()
      req.get '/app'
      .expect 302
      .end (err,res) ->
        should.not.exist err
        should.exist res
        res.should.have.property 'header'
        .which.has.property 'location','/'
        done()
