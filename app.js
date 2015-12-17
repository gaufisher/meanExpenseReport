var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var passport = require('passport');
var app = module.exports = express();
var session = require("express-session")

//define mongoose stuff
var mongoose = require('mongoose');
require('./models/users');
require('./models/reports');
require('./models/projects');
mongoose.connect('mongodb://localhost/quickrbooks');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('public', path.join(__dirname,'public'));
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
        secret: "hidden",
  //      key: 'asdasdasd', 
        cookie: { maxAge: 60000, secure: false },
        resave: true,
        saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/app',routes);
app.use('/user', users);
app.use('/', login);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

function requireLogin(req, res, next){
console.log("middleWare")
console.log(req.user)
console.log(req.path)
    
    if (!req.user) {
        console.log("no user")
        console.log(req.path)
            //res.redirect('/login');
            next()
    }
    else next();
}
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    .render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  .render('error', {
    message: err.message,
    error: {}
  });
});

