var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    author: {type: String, required: true},
    text: {type: String, required: true},
    post_id: {type: Schema.Types.ObjectId, ref: "Post"},
    reply_id: {type: Schema.Types.ObjectId, ref: "Reply"}
},
{
    timestamps: true
});

module.exports = mongoose.model("Comment", commentSchema);