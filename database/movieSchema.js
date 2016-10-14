var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var movieSchema = new Schema({
    mv_id: {type: String, unique: true, required: true, dropDups: true},
    title: {type: String, required: true},
    desc: String,
    genre: String,
    voteAvg: Number,
    poster: String,
    bg: String
});

module.exports = movieSchema;