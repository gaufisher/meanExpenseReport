var router = require('express').Router();
var path = require('path');
var LdapStrategy = require('passport-ldapauth').Strategy;
var passport = require('passport');
var app = require('../app');
var options = {server :{
        url: 'ldap://corpdc01.catalystsolves.com:389',
        bindDn: "{{username}}",
        bindCredentials: "{{password}}",
        searchBase: 'dc=catalystsolves,dc=com',
        searchFilter: '(|(sAMAccountName={{username}})(uid={{username}}))'
        }};

passport.use(new LdapStrategy(options));

router.get('/',function(req,res,next){
    res.sendFile(path.normalize(__dirname + '/../public/login.html'));
});

router.post('/', function(req, res, next) {
    passport.authenticate('ldapauth' ,{ session: false }, function (err, user, info) {
        var error = err || info;
        console.log(user)
        if (error) return res.json(401, error);
        if (!user) return res.json(404, {message: 'Something went wrong, please try again.'});
       // var token = auth.signToken(user._id, user.role);
       // res.json({token: token});
    })(req, res, next)
});

module.exports = router;
