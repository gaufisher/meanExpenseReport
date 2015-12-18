var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
    name: String,
    approver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Project', ProjectSchema);
