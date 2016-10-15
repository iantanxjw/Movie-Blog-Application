$.get("/post", function(posts) {
    $.each(posts, function(i, post) {

        var h3 = $("<h3>", {
            class: "post-subtitle",
        });
        var desc = $("<p>");
        var expand = $("<div>", {
            class: "post-expand"
        });
        var poster = $("<img>")
        var commentsdiv = $("<div>", {
            class: "comments"
        });

        $.get("/movie/" + post.mv_id, function(movie) {
            $(h3).html(movie.title);
            $(desc).html(movie.desc.substr(0, 100) + "...");
            $(poster).prop("src", "http://" + movie.poster);
        }, "json");

        $.get("/comment/" + post._id, function(comments) {
            // need to check if child comment and append to parent
            $.each(comments, function(i, comment) {
                $(commentsdiv).append(
                    "<div><p>" + comment.text + "</p>" +
                    "<p>" + comment.author + "</p>"
                );
            })
        })

        var postpreview = $("<div>", {
            class: "post-preview card card-1"
        }).hide();
        var link = $("<a>", {
            class: "post-link"
        });
        var h2 = $("<h2>", {
            class: "post-title",
            html: post.title
        });
        var p = $("<p>", {
            class: "post-meta",
            html: "Created by " + post.author + " on " + post.createdAt
        });

        $(poster).appendTo(expand);
        $(commentsdiv).appendTo(expand);

        $(h2).appendTo(link);
        $(h3).appendTo(link);
        $(desc).appendTo(link);
        $(link).appendTo(postpreview);
        $(p).appendTo(postpreview);
        $(expand).appendTo(postpreview);

        $(postpreview).appendTo("#posts").fadeIn("slow");
    });

    $(".post-preview").on("click", function() {
        console.log("fucked");
        $(this).find(".post-expand").slideToggle(500);
    });
}, "json");