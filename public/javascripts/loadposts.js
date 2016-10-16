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

        var link = $("<a>", {
            class: "post-link"
        });

        $.get("/movie/" + post.mv_id, function(movie) {
            $(link).attr("data-id",  movie.id);
            $(h3).html(movie.title);
            $(desc).html(movie.desc.substr(0, 100) + "...");
            $(poster).prop("src", "http://" + movie.poster);
        }, "json");

        $.get("/comment/" + post._id, function(comments) {
            // need to check if child comment and append to parent
            $.each(comments, function(i, comment) {
                $(commentsdiv).append(
                    "<div><p>" + comment.text + "</p>" +
                    "<p>" + comment.author + "</p>");
            });
        });

        var postpreview = $("<div>", {
            class: "post-preview card card-1"
        }).hide();

        //console.log(movieId);

        var h2 = $("<h2>", {
            class: "post-title",
            html: post.title
        });
        var p = $("<p>", {
            class: "post-meta",
            html: "Created by " + post.author + " on " + post.createdAt
        });

        var button = $("<button>", {
            class: "load_form",
            html: "Comment..."
        });

        var form = "<div class='form'>" +
            "<h3>Leave a comment</h3>" +
            "<form id='comment' action='comment/' method=POST class='form'>" +
            "<input name='post_id' type='hidden' value='" + post._id + "'>" +

            "<label for='author'>Your name </label>" +
            "<input name='author' type='text' required>" +

            "<label for='text' class='required'>Your message</label>" +
            "<textarea name='text' class='txtarea' rows='10' tabindex='4' required></textarea>" +

            "<input type='submit'>" +
            "</form></div>";

        $(poster).appendTo(expand);
        $(commentsdiv).appendTo(expand);

        $(h2).appendTo(link);
        $(h3).appendTo(link);
        $(desc).appendTo(link);
        $(link).appendTo(postpreview);
        $(p).appendTo(postpreview);
        $(button).appendTo(expand);
        $(form).appendTo(expand);
        $(expand).appendTo(postpreview);

        $(postpreview).appendTo("#posts").fadeIn("slow");

    });

    $(".post-link").on("click", function() {
        console.log("fucked");
        $(this).closest(".post-preview").find(".post-expand").slideToggle(500);
        var mv_id = $(this).data("id");

        $.get("/movie/" + mv_id, function(movie) {

            $(this).find(".post-description").html(movie.desc);

        }, "json");

    });

    $(".load_form").on("click", function() {
        $('.form').html('<div id="respond">'+
            '<div class="centered">'+
            '<h3>Leave a Comment</h3><br/>'+
            '<form id="commentform" action="#" method="post">'+
            '<label for="comment_author" class="required">Your name</label>'+
            '<input id="comment_author" type="text" name="comment_author" value="" tabindex="1" required="required"/><br/>'+
            '<label for="email" class="required">Your email</label>'+
            '<input id="email" type="email" name="email" value="" tabindex="2" required="required"/><br/>'+
            '<label for="comment" class="required">Your message</label>'+
            '<textarea id="comment" name="comment" rows="10" tabindex="4" required="required"></textarea><br/> </form>'+
            '<input id="comment_post_ID" type="hidden" name="comment_post_ID" value="1"/>'+
            '<button name="submit" type="submit" value="Submit comment" class="btn">Submit Comment</button>'+
            '</div>'+
            '</div>');
        // console.log($(this).data("id"));
    });

    $(".load_form").on("click", function() {
        $(this).closest(".post-preview").find(".form").slideToggle(500);
    });

    $(".form").on("submit", function(event) {
        event.preventDefault();
        console.log($(".txtarea").val());

        $.post($(this).prop("action"), {author: $(this).find("input[name=author]").val(), post_id: $(this).find("input[name=post_id]").val(), text: $(this).find(".txtarea").val()}, function(data) {
            console.log(data);
        })
    })


}, "json");


