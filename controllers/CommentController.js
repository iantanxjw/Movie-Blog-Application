var Comment = require("../models/Comment");

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
    },
    "parent_comment": {
        optional: true
    }
}

exports.create = function(req, res) {
    // validate input according to the validation schema above
    req.check(validation);
    var errors = req.validationErrors();

    if (errors) {
        res.json({success: false, errors: errors});
    }
    else {
        // sanitise user input
        req.sanitize("author").escape().trim();
        req.sanitize("text").escape();
        
        var comment = new Comment({
            author: req.body.author,
            text: req.body.text,
            post_id: req.body.post_id,
            parent_comment: req.body.parent_comment
        });

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
            res.json({errors: err});
        }

        comment.author = "[removed]";
        comment.text = "[removed]";

        comment.save(function(err) {
            if (err) {
                console.log(err);
                res.json({errors: err});
            }

            res.json({success: "Comment successfully deleted"});
        })
    })
}

exports.findCommentsForPost = function(req, res) {
    Comment.find({post_id: req.params.comment_id}, function(err, comments) {
        if (err) {
            console.log(err);
            res.json({errors: err});
        }

        res.json(comments);
    });
}