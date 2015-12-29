
var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
var router = express.Router();
var multer	=	require('multer');

router.get('/',function(req,res,next){
   res.render('index');
});

var storage	=	multer.diskStorage({
      destination: function (req, file, callback) {
         callback(null, './public/uploads');
      },
      filename: function (req, file, callback) {
          callback(null, file.originalname);
      }
});

var upload = multer({ storage : storage}).single('receipt');

router.post('/upload',function(req,res){
	upload(req,res,function(err) {
		if(err) {
			return res.end("Error uploading file.");
		}
		res.end("File is uploaded");
	});
});

module.exports = router;
