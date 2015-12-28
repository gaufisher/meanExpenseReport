var router = require('express').Router();
var path = require('path');
var ActiveDirectory = require('activedirectory');
var passport = require('passport');
var CustomStrategy = require('passport-custom')
var mongoose = require('mongoose');
require('../models/users');
var User = mongoose.model('User');

passport.use('activeDirectory', new CustomStrategy(
    function(req, callback) {
    	var config = {  url: 'ldap://corpdc01.catalystsolves.com:389',
                	baseDN: 'dc=catalystsolves,dc=com'
                    }
       var ad = new ActiveDirectory(config);

       ad.authenticate(req.body.username+"@catalystsolves.com", req.body.password, function(err, auth) {
	if (err) {
        	console.log('ERROR: '+JSON.stringify(err));
                callback(err, null);
                 }

        if (auth) {
                User.findOne({name : req.body.username},function(err,doc){
                if(!doc){
                	var user = new User({name: req.body.username});
                        user.save();
                        console.log("Created new entry")
                }
                else
                        console.log("AlreadyThere")
                })

                callback(null,req.body.username);}
       	else
                console.log('Authentication failed!');

   });
    }
));
passport.serializeUser(function(user, done) {
      done(null, user);
});

passport.deserializeUser(function(user, done) {
    User.findOne({'name': user}, "_id name", function(err, usr) {
        done(null, usr);
    });
});


router.get('/',function(req,res,next){
		if (req.user) {
        res.redirect('/app');
    }
    res.sendFile(path.normalize(__dirname + '/../public/login.html'));
});

router.post('/', function(req, res, next) {
   passport.authenticate('activeDirectory',function(err,user,info){
     if (err) { return res.redirect('/?error'); }
    if (!user) { return res.redirect('/?error'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/app');
    });
   })
  (req,res,next)


});
router.get('/logout',function(req,res,next){
    req.logout();
    res.redirect('/');
});
module.exports = router;
