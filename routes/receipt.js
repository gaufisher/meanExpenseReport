
var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
var router = express.Router();
var multer	=	require('multer');

require('../models/reports');
var Report = mongoose.model('Report');

router.get('/',function(req,res,next){
   res.render('index');
})

var storage	=	multer.diskStorage({
      destination: function (req, file, callback) {
         // callback(null, './public/uploads');
         callback(null, './uploads');
      },
      filename: function (req, file, callback) {
          callback(null, file.originalname);
      }
});

var upload = multer({ storage : storage}).single('receipt');
//var upload = multer({ storage : storage}).array('receipt', 1000);

router.post('/upload',function(req,res){
	upload(req,res,function(err) {
		if(err) {
			return res.end("Error uploading file.");
		}
		res.end("File is uploaded");
	});
});

router.get('/receipts',function(req,res){
    var report = new Report(req.body);
    var reportReceipts = report.receipts;
    var receipt = {};
    var receipts = [];

    for (var i = 0; i < reportReceipts.length; i++) {
         var imgFile = fs.readfilesync(reportReceipts[i].imgPath);
         receipt.name = reportReceipts[i].name;
         receipt.id = reportReceipts[i]._id;
         receipt.file = imgFile;
         receipts.push(receipt);
    }
});

router.delete('/receipts',function(req,res){

});

module.exports = router;
