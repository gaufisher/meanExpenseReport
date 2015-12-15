var mongoose = require('mongoose');

module.exports = mongoose.model('Project', {
  name: {type: String, required: true }
});