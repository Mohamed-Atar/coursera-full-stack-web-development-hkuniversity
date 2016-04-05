// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favoriteSchema = new Schema({
   postedBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    dishes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Dishes'
 }]    
}, {
    timestamps: true
});

var Favorites = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorites;