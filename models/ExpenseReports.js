
var mongoose = require('mongoose');

var ExpenseReportSchema = new mongoose.Schema({
	_id: Number,
	Name: String,
	lineItem: [{
		Type: { type: String },
		Value: Number
	}], 
	Project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
	User: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('ExpenseReport', ExpenseReportSchema);

module.exports = ExpenseReport;