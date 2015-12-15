var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true}
});

mongoose.model('User', UserSchema);
