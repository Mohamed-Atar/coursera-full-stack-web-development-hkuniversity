var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favorites = require('../models/favorites');
var Verify    = require('./verify'); // i added this and it looks good

var favsRouter = express.Router();
favsRouter.use(bodyParser.json());

favsRouter.route('/')
.get( Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.find({"postedBy": req.decoded._doc._id})  
        .populate('postedBy')
        .populate('dishes')
        .exec(function (err, favs) {
        if (err) throw err;
         
        res.json(favs);
    });
})

.post( Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.findOne({"postedBy":req.decoded._doc._id }, function (err, favs) { 
        if(!favs){
                 Favorites.create(req.body, function (err, favs) {
                    if (err) throw err;
                    favs.postedBy = req.decoded._doc._id; 
                    console.log('your favorite has been created!');
                    favs.dishes.push(req.body._id);
                     favs.save(function (err, favs) {
                        if (err) throw err;
                        console.log('Dish added');
                        res.json(favs);
                    }); 
                  }); 

        }else{
              var test = favs.dishes.indexOf(req.body._id);
              if(test > -1){
                 var err = new Error('This recipe is already in your favorite list');
                 err.status = 401;
                return next(err);
              }else{
              favs.dishes.push(req.body._id);
                favs.save(function (err, favs) {
                  if (err) throw err;
                  console.log('Dish added');
                    res.json(favs);
                 });
              }
              } 
    });  
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.remove({"postedBy":req.decoded._doc._id}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

favsRouter.route('/:favsId')
.delete(Verify.verifyOrdinaryUser, function(req, res, next){
    Favorites.findOne({postedBy: req.decoded._doc._id}, function (err, favs) {
        if (err) throw err;
        if (favs) {
            var index = favs.dishes.indexOf(req.params.favsId);
            if (index > -1) {
                favs.dishes.splice(index, 1);
            }
            favs.save(function (err, favorite) {
                if (err) throw err;
                res.json(favorite);
            });
        } else {
            var err = new Error('There\' no Favorites');
            err.status = 401;
            return next(err);
        }
    });
});

module.exports = favsRouter;