var Post = require("../models/Post");
var Comment = require("../models/Comment");

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
    var post = new Post({
        mv_id: req.body.mv_id,
        title: req.body.title,
        author: req.body.author
    });

    post.save(function(err) {
        if (err) {
            console.log(err);
            res.json({error: "Could not create post"});
        }

        res.json({success: "Post created"});
    });
}

exports.update = function(req, res) {
    Post.findById(req.params.post_id, function(err, post) {
        if (err) {
            console.log(err);
            res.json({error: "Could not find post with the id: " + req.params.post_id});
        }

        post.mv_id = req.body.mv_id;
        post.title = req.body.title;
        post.author = req.body.author;

        post.save(function(err) {
            if (err) {
                console.log(err);
                res.json({error: "Could not update post with the id: " + req.params.pod_id});
            }

            res.json({success: "Post updated"});
        });
    });
}

exports.delete = function(req, res) {
    Post.remove(req.params.post_id, function(err, post) {
        if (err) {
            console.log(err);
            res.json({error: "Could not delete post with the id: " + req.params.post_id});
        }

        res.json({success: "Post successfully deleted"});
    });
}
