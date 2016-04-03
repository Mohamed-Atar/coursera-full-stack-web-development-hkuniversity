var
  express = require('express');

var users = express.Router();

exports.list = function(req, res){
  res.send("respond with a resource");
};

module.exports = users;