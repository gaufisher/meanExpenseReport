process.env.testRunning = true;
request      = require 'supertest'
app          = require '../app'
should       = require 'should'
mongoose     = require 'mongoose'
Project      = mongoose.model 'Project'
req = request.agent app

describe 'it should test project endpoints', (done)->
  pid = 1
  before (done)->
    `for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove(function() {});
    }`
    req.post '/'
    .send username: 'LDAPUser', password:"@oxXiS,;AIry\\{8wixuf3;f^?"
    .end done

  it 'should create a new project', (done)->
    req.post '/app/projects'
    .send(name: 'newProject')
    .expect 200
    .end (err,res)->
      should(err).be.null()
      should(res).be.not.null()
      res.should.have.property 'body'
      .which.is.an.Object().which.has.property 'name','newProject'
      project = new Project res.body
      pid = res.body._id
      project.populate 'approver', (err,proj)->
        proj.should.have.property 'approver'
        .which.has.property 'name','LDAPUser'
        done()

  it 'should fail at creating project of same name', (done)  ->
      req.post '/app/projects'
      .send name: 'newProject'
      .expect 500
      .end (err,res) ->
        should.not.exist err
        done()
  # it 'should get back project of same name', ->
  #   req.get '/app/project/'+pid
  #   #.expect 200
  #   .end (err,res) ->
  #     should(err).be.null()
  #     should(res).be.not.null()
  #     res.should.have.property 'body'
  #     .which.is.an.Object()
  #     res.body.should.have.property 'name','newProject'
  #     res.body._id.should.be.equal(pid)

  it 'should get back one project', (done) ->
    req.get '/app/projects'
    .expect 200
    .end (err,res)->
      should(err).be.null()
      should(res).be.not.null()
      res.should.have.property 'body'
      .which.is.an.Array()
      res.body[0].should.have.property 'name','newProject'
      done()
