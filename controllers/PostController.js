var Post = require("../models/Post");
var validation = {
    "mv_id": {
        notEmpty: true,
        isInt: {
            errorMessage: "Movie ID must be a number"
        },
        errorMessage: "Invalid movie ID"
    },
    "title": {
        notEmpty: true,
        errorMessage: "Invalid post title"
    },
    "author": {
        notEmpty: true,
        isAlpha: {
            errorMessage: "Author can only contain letters"
        },
        errorMessage: "Invalid author"
    }
}

exports.show = function(req, res) {
    Post.findById(req.params.post_id, function(err, post) {
        if (err) {
            console.log(err);
        }

        res.json(post);
    });
}

exports.showAll = function(req, res) {
    Post.find({}, function(err, posts) {
        if (err) {
            console.log(err);
        }

        res.json(posts);
    });
}

exports.create = function(req, res) {
    req.check(validation);
    var errors = req.validationErrors();

    if (errors) {
        res.json({success: false, errors: errors});
    }
    else {
        var post = new Post({
            mv_id: req.body.mv_id,
            title: req.body.title,
            author: req.body.author
        });

        post.save(function(err) {
            if (err) {
                console.log(err);
                res.json({errors: err});
            }

            res.json({success: "Post created"});
        });
    }
}

exports.update = function(req, res) {
    req.check(validation);
    var errors = req.validationErrors();

    if (errors) {
        res.json({success: false, errors: errors});
    }
    else {
        Post.findById(req.params.post_id, function(err, post) {
            if (err) {
                console.log(err);
                res.json({errors: err});
            }

            post.mv_id = req.body.mv_id;
            post.title = req.body.title;
            post.author = req.body.author;

            post.save(function(err) {
                if (err) {
                    console.log(err);
                    res.json({errors: err});
                }

                res.json({success: "Post updated"});
            });
        });
    }
}

exports.delete = function(req, res) {
    Post.remove(req.params.post_id, function(err, post) {
        if (err) {
            console.log(err);
            res.json({errors: err});
        }

        res.json({success: "Post successfully deleted"});
    });
}
