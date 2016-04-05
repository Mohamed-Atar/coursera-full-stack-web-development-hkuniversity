// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;




// create a schema
var leadershipSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    image: {
          type: String,
          required: true,
          unique: false  

    },
    designation: {
            type: String,
            required: true,
            unique: false
    },
    abbr: {
            type: String,
            default: " ",
            required: false,
            unique: false
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: false
});

// the schema is useless so far
// we need to create a model using it
var Leaderships = mongoose.model('Leadership', leadershipSchema);

// make this available to our Node applications
module.exports = Leaderships;