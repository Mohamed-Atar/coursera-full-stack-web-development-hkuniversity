
var
  express = require('express');

var index = express.Router();

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

module.exports = index;