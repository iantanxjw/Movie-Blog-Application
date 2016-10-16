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
                    "<p>" + comment.author + "</p>");
            });
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

        var button = $("<button>", {
            class: "load_form",
            html: "Comment..."
        });

        var form = "" +
            "<h3>Leave a comment</h3>" +
            "<form id='comment' action='comment/' method=POST class='form'>" +
            "<input name='post_id' type='hidden' value='" + post._id + "'>" +

            "<label for='author'>Your name </label>" +
            "<input name='author' type='text' required>" +

            "<label for='text' class='required'>Your message</label>" +
            "<textarea name='text' class='txtarea' rows='10' tabindex='4' required></textarea>" +

            "<input type='submit'>" +
            "</form>";

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
    });

    $(".load_form").on("click", function() {
        $(this).closest(".post-preview").find(".form").slideToggle(500);
    });

    $(".form").on("submit", function(event) {
        event.preventDefault();
        console.log($(".txtarea").val());

        $.post($(this).prop("action"), {author: $(this).find("input[name=author]").val(),
            post_id: $(this).find("input[name=post_id]").val(), text: $(this).find(".txtarea").val()}, function(data) {
            if (data.success === false) {
                $.each(data.errors, function(index, error) {
                    $.notify(error.msg, "error");
                });
            }
            else {
                $.notify(data.success, "success");
            }
        }, "json");
    })


}, "json");

