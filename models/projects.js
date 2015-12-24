var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var ProjectSchema = new mongoose.Schema({
    name: {type: String, unique:true},
    approver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

ProjectSchema.plugin(uniqueValidator);
mongoose.model('Project', ProjectSchema);
