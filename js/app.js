

$(document).ready(function () {

    carousel.Init();
    carousel.Advance();

    $(document).keypress(function(e) {
        let key = String.fromCharCode(e.which);
        if(key === "a") {
            carousel.Move(carousel.GetCurrent() - 1);
        }
        else if(key === "d") {
            carousel.Move(carousel.GetCurrent() + 1);
        }
    });

    //diplays cookie popup if policy hasn't been accepted
    if(!document.cookie.includes("cookies-accepted=true")) {
        $("#cookie-popup").show();
        $("#accept-cookies").on("click", function() {
            document.cookie = "cookies-accepted=true";
            $("#cookie-popup").hide();
        });
    }

    $('.hamburger-menu').on("click", function() {
        $('.main').addClass("sidebar-active");
        $(".main-overlay").addClass("is-enabled");
        $(".hamburger").addClass("is-active");
    });

    $(".main-overlay").on("click", function() {
        $('.main').removeClass("sidebar-active");
        $(".main-overlay").removeClass("is-enabled");
        $(".hamburger").removeClass("is-active");
    });
});

