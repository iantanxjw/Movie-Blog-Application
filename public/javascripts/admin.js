$(function() {
    $(".show-form").click(function() {

        $.get("/movie", function(movies) {
            $.each(movies, function(i, movie) {
                $("select[name=mv_id]").append("<option value='" + movie.id + "'>" + movie.title + "</option>");
            });
        }, "json");

        $(this).fadeOut("slow");
        $(":animated").promise().done(function() {
            $("form").fadeIn("slow");
        });
    })

    $("form").on("submit", function(event) {
        event.preventDefault();
        $(this).fadeOut("slow");
        
        $.post($(this).prop("action"), {title: $("input[name=title]").val(), author: $("input[name=author]").val(), mv_id: $("select[name=mv_id]").val()}, function(data) {
            $(".show-form").fadeIn("slow");
            $("form").fadeOut("slow");
            $("form").parent("div").append(data.success);
        }, "json");
    });

    $("#update").click(function() {
        $.get("/movie/apiupdate", function(data) {
            $(".col-lg-8").append(data.success);
        })
    })
});