var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var movieSchema = new Schema({
    id: {type: String, unique: true, required: true},
    title: {type: String, required: true},
    desc: String,
    //genre: String,
    voteAvg: Number,
    poster: String,
    bg: String
});

module.exports = mongoose.model("Movie", movieSchema);