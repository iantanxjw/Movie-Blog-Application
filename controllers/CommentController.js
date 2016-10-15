var Comment = require("../models/Comment");
var Reply = require("../models/Reply");
var validation = {
    "author": {
        notEmpty: true,
        errorMessage: "Invalid author"
    },
    "text": {
        notEmpty: true,
        isLength: {
            options: [{min: 5, max: 500}],
            errorMessage: "Comments must be between 5 and 500 characters"
        },
        errorMessage: "Invalid comment"
    },
    "post_id": {
        notEmpty: true,
        errorMessage: "Invalid post"
    }
}

exports.create = function(req, res) {
    req.check(validation);
    var errors = req.validationErrors();

    if (errors) {
        res.json({success: false, errors: errors});
    }
    else {
        var comment = new Comment({
            author: req.body.author,
            text: req.body.text,
            post_id: req.body.post_id
        });

        // create a reply if it's a reply to a comment
        if (req.body.parentComment != null) {
            var reply = new Reply({
                comment_id: req.body.parentComment
            });

            // now find the parent comment and update it with this childs id
            Comment.findById(req.body.parentComment, function(err, parentComment) {
                if (err) {
                    console.log(err);
                }

                console.log(parentComment);

                parentComment.reply_id = reply._id;
                parentComment.save(function(err) {
                    if (err) {
                        console.log(err);
                        res.json({errors: err});
                    }
                });
            });

            reply.save(function(err) {
                if (err) {
                    console.log(err);
                    res.json({errors: err});
                }
            });
        }

        comment.save(function(err) {
            if (err) {
                console.log(err);
                res.json({errors: err});
            }
        });

        res.json({success: "Comment created successfully"});
    }
}

exports.delete = function(req, res) {
    // this won't actually remove from the db - just set the text and author to null
    Comment.findById(req.params.comment_id, function(err, comment) {
        if (err) {
            console.log(err);
            res.json({message: "Could not delete comment with the id: " + req.params.comment_id});
        }

        comment.author = "[removed]";
        comment.text = "[removed]";

        comment.save(function(err) {
            if (err) {
                console.log(err);
                res.json({error: "Could not delete comment with the id: " + req.params.comment_id});
            }

            res.json({success: "Successfully deleted comment"});
        })
    })
}

exports.findCommentsForPost = function(req, res) {
    Comment.find({post_id: req.params.comment_id}, function(err, comments) {
        if (err) {
            console.log(err);
            res.json({error: "Could not find any comments for: " + req.params.comment_id});
        }

        res.json(comments);
    });
}