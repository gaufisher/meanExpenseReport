process.env.testRunning = true;
request      = require 'supertest'
app          = require '../app'
should       = require 'should'
mongoose     = require 'mongoose'
# Project      = mongoose.model 'Project'
req = request.agent app
report = {
    #"_id" : ObjectId("5681ca576ec4cce36ec368f5"),
    #"user" : ObjectId("5681ca3d6ec4cce36ec368f3"),
    "name" : "New report2",
    #"project" : ObjectId("5681ca446ec4cce36ec368f4"),
    "notes" : "Some notes2",
    "status" : "submitted",
    # "rejections" : [
    #     {
    #         "reason" : "rejected2",
    #         "_id" : ObjectId("5681ca686ec4cce36ec368f9"),
    #         "date" : ISODate("2015-12-28T23:48:56.217Z")
    #     }
    # ],
    # "unsubmitReasons" : [
    #     {
    #         "notes" : "unsubmitted2",
    #         "_id" : ObjectId("5681ca5e6ec4cce36ec368f8"),
    #         "date" : ISODate("2015-12-28T23:48:46.533Z")
    #     }
    # ],
    "items" : [
        {
            "type" : "Mileage",
            "value" : 234232,
          #  "_id" : ObjectId("5681ca576ec4cce36ec368f7")
        },
        {
            "type" : "Lodging",
            "value" : 2342,
        #    "_id" : ObjectId("5681ca576ec4cce36ec368f6")
        }
    ],
    "__v" : 2
}

describe 'it should test all /app/expense-report endPoints' , (done)->
  pid = 1
  erid = 1

  before (done)->
    `for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove(function() {});
    }`
    req.post '/'
    .send username: 'LDAPUser', password:"@oxXiS,;AIry\\{8wixuf3;f^?"
    .end ->
      req.post '/app/projects'
      .send name: 'newProject'
      .end (err,res) ->
        pid = res.body._id
        done()


  it 'should post an expense Report', (done)->
    report.project = pid;
    req.post '/app/expense-report'
    .send report
    .expect 200
    .end (err,res)->
      should.not.exist err
      should.exist res
      res.should.have.property 'body'
      .which.has.property 'name'
      .which.is.equal report.name
      erid = res.body._id
      done()
  it 'should get back the expense report just posted', (done) ->
    req.get '/app/expense-report/'+erid
    .expect 200
    .end (err,res) ->
      should.not.exist err
      should.exist res
      res.should.have.property 'body'
      .which.has.property 'name'
      .which.is.equal report.name
      res.body._id.should.equal erid
      done()
  it 'should get back a list of one reports', (done) ->
    req.get '/app/expense-report/'
    .expect 200
    .end (err,res) ->
      should.not.exist err
      should.exist res
      res.should.have.property 'body'
      .which.is.an.Array()
      .which.has.length 1
      done()
