var express = require('express');
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
    res.render("index", {title: "Home"});
});

router.get('/dotenvtest', function(req, res, next) {
    res.render('dotenvtest', {
        title: "dotenvtest",
        key: process.env.TMDB_API_KEY,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        db: process.env.DB_DATABASE
    });
});

module.exports = router;
