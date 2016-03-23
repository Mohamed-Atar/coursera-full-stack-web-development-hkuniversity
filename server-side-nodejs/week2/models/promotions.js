/**
 * Created by mmaia on 3/23/16.
 */
'use strict';

var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var promotionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ""
  },
  price: {
    type: Currency,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

var Promotions = mongoose.model('Promotion', promotionSchema);

module.exports = Promotions;