$.get("/post", function(posts) {
    $.each(posts, function(i, post) {

        var h3 = $("<h3>", {
            class: "post-subtitle",
        });
        var desc = $("<p>", {
            class: "post-description",
        });
        var expand = $("<div>", {
            class: "post-expand"
        });
        var poster = $("<img>");
        var commentsdiv = $("<div>", {
            class: "comments"
        });

        $.get("/movie/" + post.mv_id, function(movie) {
            $(h3).attr( "data-id",  movie.id);
            $(h3).html(movie.title);
            $(desc).html(movie.desc.substr(0, 100) + "...");
            $(poster).prop("src", "http://" + movie.poster);
        }, "json");

        $.get("/comment/" + post._id, function(comments) {
            // need to check if child comment and append to parent
            $.each(comments, function(i, comment) {
                $(commentsdiv).append(
                    "<div><p>" + comment.text + "</p>" +
                    "<p>" + comment.author + "</p>" +
                    "<button class='load_form'>Reply</button>" +
                    "<div class='form'>" +
                    '<hr><div id="respond">' +
                    '<div class="centered">' +
                    '<h3>Leave a Comment</h3><br/>' +
                    '<form id="commentform" action="#" method="post">' +
                    '<label for="comment_author" class="required">Your name</label>' +
                    '<input id="comment_author" type="text" name="comment_author" value="" tabindex="1" required="required"/><br/>' +
                    '<label for="email" class="required">Your email</label>' +
                    '<input id="email" type="email" name="email" value="" tabindex="2" required="required"/><br/>' +
                    '<label for="comment" class="required">Your message</label>' +
                    '<textarea id="comment" name="comment" rows="10" tabindex="4" required="required"></textarea><br/> </form>' +
                    '<input id="comment_post_ID" type="hidden" name="comment_post_ID" value="1"/>' +
                    '<button name="submit" type="submit" value="Submit comment" class="btn">Submit Comment</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>'

                );
            });
            $(commentsdiv).append("<button class='load_form'>Add Comment</button>" +
                "<div class='form'>" +
                '<hr><div id="respond">' +
                '<div class="centered">' +
                '<h3>Leave a Comment</h3><br/>' +
                '<form id="commentform" action="#" method="post">' +
                '<label for="comment_author" class="required">Your name</label>' +
                '<input id="comment_author" type="text" name="comment_author" value="" tabindex="1" required="required"/><br/>' +
                '<label for="email" class="required">Your email</label>' +
                '<input id="email" type="email" name="email" value="" tabindex="2" required="required"/><br/>' +
                '<label for="comment" class="required">Your message</label>' +
                '<textarea id="comment" name="comment" rows="10" tabindex="4" required="required"></textarea><br/> </form>' +
                '<input id="comment_post_ID" type="hidden" name="comment_post_ID" value="1"/>' +
                '<button name="submit" type="submit" value="Submit comment" class="btn">Submit Comment</button>' +
                '</div>' +
                '</div>' +
                '</div>');
        });

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

    $(".post-link").on("click", function() {
        console.log("fucked");
        $(this).closest(".post-preview").find(".post-expand").slideToggle(500);
    });


}, "json");

