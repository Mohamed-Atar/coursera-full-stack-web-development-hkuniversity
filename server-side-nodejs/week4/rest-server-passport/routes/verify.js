var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config.js');

exports.getToken = function (user) {
  return jwt.sign(user, config.secretKey, {
    expiresIn: 3600
  });
};

exports.verifyOrdinaryUser = function (req, res, next) {
  // check header or params
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, config.secretKey, function (err, decoded) {
      if (err) {
        var err = new Error('You are not authenticated!');
        err.status = 401;
        return next(err);
      } else {
        req.decoded = decoded;
        var flag = req.decoded._doc.admin;
        console.log("the flag is " + flag + "  only 'true' can do Post & Delete ");

        next();
      }
    });
  } else {
    var err = new Error('No token provided!');
    err.status = 403;
    return next(err);
  }


};

exports.verifyAdmin = function (req, res, next) {
  var flag = req.decoded._doc.admin;
  if (flag == false) {
    //not admin pass error to next middleware
    var err = new Error('Need to be admin to execute, you are not!');
    err.status = 401;
    return next(err);
  } else {
    //admin so proceed
    console.log("flag: " + flag);
    next();
  }

};    