var express = require('express');
var router = express.Router();
var controllers = {
    MovieController: require("../controllers/MovieController"),
    PostController: require("../controllers/PostController"),
    CommentController: require("../controllers/CommentController")
};

/* GET home page. */
router.get("/", function(req, res, next) {
    res.render("index", {title: "Home"});
});

router.get("/admin", function(req, res, next) {
    res.render("admin", {title: "admin"});
});

// TEMPORARY
router.get("/movie/apiupdate", function(req, res) {
    controllers.MovieController.apiRequest(req, res);
});

router.get("/movie/random", function(req, res) {
    controllers.MovieController.randomMovie(req, res);
});


/*################
### MOVIE CRUD ###
################*/
router.route("/movie")
    // get all movies
    .get(function(req, res) {
        controllers.MovieController.showAll(req, res);
    })

    // create a new movie
    .post(function(req, res) {
        controllers.MovieController.create(req, res);
    });

router.route("/movie/:mv_id")
    // get specific movie
    .get(function(req, res) {
        controllers.MovieController.show(req, res);
    })

    // update a movie
    .put(function(req, res) {
        controllers.MovieController.update(req, res);
    })

    // delete a movie
    .delete(function(req, res) {
        controllers.MovieController.delete(req, res);
    });


/*####################
### BLOG POST CRUD ###
####################*/
router.route("/post")
    // get all posts
    .get(function(req, res) {
        controllers.PostController.showAll(req, res);
    })

    // create a new post
    .post(function(req, res) {
        controllers.PostController.create(req, res);
    });

router.route("/post/:post_id")
    // get a specific post
    .get(function(req, res) {
        controllers.PostController.show(req, res);
    })

    // update post
    .put(function(req, res) {
        controllers.PostController.update(req, res);
    })

    // delete post
    .delete(function(req, res) {
        controllers.PostController.delete(req, res);
    });

/*##################
### COMMENT CRUD ###
##################*/
router.route("/comment")
    // create a comment
    .post(function(req, res) {
        controllers.CommentController.create(req, res);
    });

router.route("/comment/:comment_id")
    // get all comments for a post
    .get(function(req, res) {
        controllers.CommentController.findCommentsForPost(req, res);
    })

    // delete comment
    .delete(function(req, res) {
        controllers.CommentController.delete(req, res);
    });

module.exports = router;
