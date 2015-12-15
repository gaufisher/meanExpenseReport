var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var mongoose = require('mongoose');
var ExpenseReport = mongoose.model('Report');

// Get all line item types
router.get('/line-item-types', function(req, res, next) {
    var lineItemTypes = [{value: 'Mileage'}, {value: 'Per Diem'}, {value: 'Lodging'}, {value: 'Travel'}, {value: 'Meals'}, {value: 'Entertainment'}, {value: 'Parking'}, {value: 'Other'}];
    res.json(lineItemTypes);
});

module.exports = router;
