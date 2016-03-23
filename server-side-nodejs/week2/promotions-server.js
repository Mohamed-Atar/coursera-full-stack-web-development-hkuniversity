/**
 * Created by mmaia on 3/23/16.
 */
'use strict';

/**
 * Created by mmaia on 3/23/16.
 */

var mongoose = require('mongoose'),
  assert = require('assert');

var Promotions = require('./models/promotions');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log("Connected correctly to server");

  // create a new promotion
  Promotions.create({
    name: 'Summer Season',
    image: 'summer.jpg',
    price: '32.23',
    description: 'Test of promotions'
  }, function (err, promotion) {
    if (err) throw err;
    console.log('Promotion created!');
    console.log(promotion);

    var id = promotion._id;

    // get all the Promotions
    setTimeout(function () {
      Promotions.findByIdAndUpdate(id, {
          $set: {
            description: 'Updated Test'
          }
        }, {
          new: true
        })
        .exec(function (err, promotion) {
          if (err) throw err;
          console.log('Updated Promotion!');
          console.log(promotion);

          promotion.save(function (err, promotion) {
            console.log('Updated Comments!');
            console.log(promotion);

            db.collection('Promotions').drop(function () {
              db.close();
            });
          });
        });
    }, 3000);
  });
});