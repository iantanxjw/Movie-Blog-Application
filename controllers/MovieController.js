var httpModule = require("http");
var Movie = require("../models/Movie");
var Post = require("../models/Post");

exports.show = function(req, res) {
    Movie.findOne({id: req.params.mv_id}, function(err, movie) {
        if (err) {
            console.log(err);
            res.json({message: "Could not find movie with the id: " + req.params.mv_id});
        }

        res.json(movie);
    })
}

exports.showAll = function(req, res) {
    Movie.find({}, function(err, movies) {
        if (err) {
            console.log(err);
            return;
        }

        res.json(movies);
    });
}

exports.create = function(req, res) {
    var movie = new Movie({
        id: req.body.id,
        title: req.body.title,
        desc: req.body.desc,
        genre: req.body.genre,
        voteAvg: req.body.voteAvg,
        poster: req.body.poster,
        bg: req.body.bg
    });

    movie.save(function(err) {
        if (err) {
            console.log(err);
            res.json({error: "Could not create: " + req.body.title});
        }

        res.json({success: "Successfully created: " + movie.title});
    });
}

exports.update = function(req, res) {
    Movie.findOne({id: req.params.mv_id}, function(err, movie) {
        if (err) {
            console.log(err);
            res.json({error: "Could not find movie with the id: " + req.params.mv_id});
        }

        console.log(movie);

        movie.title = req.body.title;
        movie.desc = req.body.desc;
        //movie.genre = req.body.genre;
        movie.voteAvg = req.body.voteAvg;
        movie.poster = req.body.poster;
        movie.bg = req.body.bg;

        movie.save(function(err) {
            if (err) {
                console.log(err);
                res.json({error: "Could not update " + movie.title});
            }

            res.json({success: "Successfully updated " + movie.title});
        })
    })
}

exports.delete = function(req, res) {
    Movie.remove({id: req.params.mv_id}, function(err, movie) {
        if (err) {
            console.log(err);
            res.json({error: "Could not delete movie with the id: " + req.params.mv_id});
        }

        // now delete both the post and comments


        res.json({success: req.params.mv_id + " deleted successfully"});
    });
}

exports.randomMovie = function(req, res) {
    
    Movie.count().exec(function(err, count) {
        var random = Math.floor(Math.random() * count);
        console.log(random);

        Movie.findOne().skip(random).exec(function(err, movie) {
            if (err) {
                console.log(err);
            }

            res.json(movie);
        });

    });
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
            var genreJson = apiGenreRequest();
            var success = [];
            var failure = [];
            var updated = [];

            for (var i = 0; i < json.items.length; i++) {
                var movie = new Movie({
                    id: json.items[i].id,
                    title: json.items[i].title,
                    desc: json.items[i].overview,
                    //genre: getGenreNames(json.items[i].genre_ids, genreJson),
                    voteAvg: json.items[i].vote_average,
                    poster: process.env.TMDB_API_IMG_URL + "/w342" + json.items[i].poster_path,
                    bg: process.env.TMDB_API_IMG_URL + "/w1280" + json.items[i].backdrop_path
                });

                // now try to insert
                movie.save(function(err) {
                    if (err) {
                        console.log(err);
                        failure.push(movie.title);
                    }

                    success.push(movie.title);
                });
            }

            res.json(success, failure, updated);
        });
    }

    // send the request
    httpModule.request(options, callback).end();
}

// private funcs
function apiGenreRequest() {
    // send another request to the api for genre names
    var options = {
        host: process.env.TMDB_API_HOST,
        path: process.env.TMDB_API_GENRE_PATH + "?api_key=" + process.env.TMDB_API_KEY
    }

    callback = function(response) {
        var string = "";

        response.on("data", function(chunk) {
            string += chunk;
        });

        response.on("end", function() {
            return JSON.parse(string);
        });
    }

    httpModule.request(options, callback).end();
}


function getGenreNames(genreIDs, json) {
    var genreNameArray = [];
    console.log(json);

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
}