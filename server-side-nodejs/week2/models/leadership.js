/**
 * Created by mmaia on 3/23/16.
 */
'use strict';

var 
  mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var leadershipSchema = new Schema({
 name: {
   type: String,
   required: true
 }, 
image: {
   type: String,
   required: true
 }, 
designation: {
   type: String,
   required: true
 }, 
abbr: {
   type: String,
   required: true
 }, 
description: {
   type: String,
   required: true
 }, 
  timestamps: true
});

var LeaderShips = mongoose.model('Leadership', leadershipSchema);


module.exports = LeaderShips;