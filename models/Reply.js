var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var replySchema = new Schema({
    comment_id: {type: Schema.Types.ObjectId, ref: "Comment", required: true}
});

module.exports = mongoose.model("Reply", replySchema);