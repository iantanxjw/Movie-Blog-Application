var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var postSchema = new Schema({
    mv_id: {type: String, ref: "Movie", required: true},
    title: {type: String, required: true},
    author: {type: String, required: true},   
},
{
    timestamps: true
});

module.exports = mongoose.model("Post", postSchema);