var mongoose = require("mongoose");
var httpModule = require("http");
var movieSchema = require("../database/movieSchema");
var Movie = mongoose.model("Movie", movieSchema);

exports.show = function(req, res) {
    Movie.find({}, function(err, movies) {
        if (err) {
            console.log(err);
            return;
        }

        res.render("movie.jade", {movies: movies});
    });
}

exports.create = function(req, res) {
    // var heat = new Movie({
    //     mv_id: "1111",
    //     title: "Heat",
    //     desc: "My favourite movie",
    //     genre: "Action, Crime, Drama",
    //     voteAvg: 9,
    //     poster: "",
    //     bg: ""
    // });

    // heat.save(function(err) {
    //     if (err) return handleError(err);
    // });

    // var rushhour = new Movie({
    //     mv_id: "2222",
    //     title: "Rush Hour",
    //     desc: "I've been lookin' for yo sweet and sour chicken ass",
    //     voteAvg: 8,
    //     poster: "",
    //     bg: ""
    // });

    // rushhour.save(function(err) {
    //     if (err) return handleError(err);
    // });

    res.redirect("/movie/show"); 
}

exports.edit = function(req, res) {
    res.render("movie.jade", {text: "edit a movie"});
}

exports.delete = function(req, res) {
    res.render("movie.jade", {text: "delete a movie"});
}

exports.apiRequest = function(req, res) {

    // create a get request - Make sure you put the correct vars in your .env!
    var options = {
        host: process.env.TMDB_API_HOST,
        path: process.env.TMDB_API_LIST + "?api_key=" + process.env.TMDB_API_KEY
    }

    // what to do with the data once it comes back
    callback = function(response) {
        var string = "";

        // data could come in chunks so append it
        response.on("data", function(chunk) {
            string += chunk;
        });

        // once call is finished start looping
        response.on("end", function() {

            // loop the data and insert it into the db
            var json = JSON.parse(string);
            var movies = [];

            for (var i = 0; i < json.items.length; i++) {
                var movie = new Movie({
                    mv_id: json.items[i].id,
                    title: json.items[i].title,
                    desc: json.items[i].overview,
                    genre: getGenreNames(json.items[i].genre_ids),
                    voteAvg: json.items[i].vote_average,
                    poster: process.env.TMDB_API_IMG_URL + "/w342" + json.items[i].poster_path,
                    bg: process.env.TMDB_API_IMG_URL + "/w1280" + json.items[i].backdrop_path
                });

                // now try to insert
                movie.save(function(err) {
                    if (err) console.log(err);
                });
            }

            res.redirect("/movie/show");
        });
    }

    // send the request
    httpModule.request(options, callback).end();
}

// private funcs
function getGenreNames(genreIDs) {
    // send another request to the api for genre names
    var options = {
        host: process.env.TMDB_API_HOST,
        path: process.env.TMDB_API_GENRE_PATH
    }

    callback = function(response) {
        var string = "";

        response.on("data", function(chunk) {
            string += chunk;
        });

        response.on("end", function() {
            var json = JSON.parse(string);
            var genreNameArray = [];

            for (var i = 0; i < json.genres.length; i++) {
                for (var j = 0; j < genreIDs.length; i++) {

                    // if ids are equal, add to the name array
                    if (genreIDs[j] === json.genres[i].id) {
                        genreNameArray.push(json.genres[i].name);
                    }

                    // break if all ids have been found
                    if (genreNameArray.length === genreIDs.length) {

                        // return a comma delimited string
                        return genreNameArray.join(", ");
                    }
                }
            }

            // should never get here but just in case
            return genreNameArray.join(", ");
        });
    }

    httpModule.request(options, callback).end();
}