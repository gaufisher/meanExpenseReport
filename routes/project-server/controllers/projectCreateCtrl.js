var Project = require('../models/project');

module.exports.create = function (req, res) {
  var project = new Project(req.body);
  project.save(function (err, result) {
  	res.json(result);
  });
}