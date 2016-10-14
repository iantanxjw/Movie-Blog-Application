var express = require('express');
var router = express.Router();
var controllers = {
    MovieController: require("../controllers/MovieController.js")
};

/* GET home page. */
router.get("/", function(req, res, next) {
    res.render("index", {title: "Home"});
});

router.get('/admin', function(req, res, next) {
    res.render('admin', {title: "admin"});
});

// CRUD
router.get("/movie/show", function(req, res) {
    controllers.MovieController.show(req, res);
});

router.get("/movie/create", function(req, res) {
    controllers.MovieController.create(req, res);
});


router.get("/movie/delete", function(req, res) {
    controllers.MovieController.delete(req, res);
});

router.get("/movie/edit", function(req, res) {
    controllers.MovieController.create(req, res);
});

router.get("/movie/apiupdate", function(req, res) {
    controllers.MovieController.apiRequest(req, res);
})

module.exports = router;
