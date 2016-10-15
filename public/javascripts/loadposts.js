$.get("/post", function(posts) {
    $.each(posts, function(i, post) {
        
        var postpreview = $("<div class='card card-1'>", {
            class: "post-preview"
        }).hide();
        var link = $("<a>", {
            href: "/post/" + post._id
        });
        var h2 = $("<h2>", {
            class: "post-title",
            html: post.title
        });
        var h3 = $("<h3>", {
            class: "post-subtitle",
        });
        var h4 = $("<h4>");
        var p = $("<p>", {
            class: "post-meta",
            html: "Created by " + post.author + " on " + post.createdAt
        });

        $.get("/movie/" + post.mv_id, function(movie) {
            $(h3).html(movie.title);
            $(h4).html(movie.desc.substr(0, 100) + "...");
        }, "json");

        $(h2).appendTo(link);
        $(h3).appendTo(link);
        $(h4).appendTo(link);
        $(link).appendTo(postpreview);
        $(p).appendTo(postpreview);
        $(postpreview).append("");

        $(postpreview).appendTo("#posts").fadeIn("slow");
    });
}, "json");
