var mongoose = require('mongoose');
//require('./users');
var ProjectSchema = new mongoose.Schema({
    name: String,
    approver: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

mongoose.model('Project', ProjectSchema);
