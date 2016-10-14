$.get("/movie/random", function(data) {
    $(".intro-header").css("background-image", "url(http://" + data.bg + ")");
}, "json");