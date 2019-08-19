

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



let carousel = (function ($) {

    // Private variables
    let _current = 0;
    let _numSlides;
    let _buttons = [];
    let _timeout;

    function Init() {

        _$initialSlides = $("#banner>.banner-slides").children();
        _numSlides = _$initialSlides.length;

        // Sets initial position of slides and assignes an index to each slide
        _$initialSlides.each(function (i) {
            $(this).data("index", i);
            $(this).css("left", `${100 * i}%`);

            // Create a button for each slide
            let $button = $('<a>&bull;</a>');
            if (i === 0)
                $button.addClass("active");
            $button.on("click", function () {
                Move(i);
            }).appendTo($("#banner>.banner-buttons"));
            _buttons.push($button);
        });

        // Duplicate first and last slide
        let $first = $(".banner-slides .slide:first-child").clone("false");
        let $last = $(".banner-slides .slide:last-child").clone("false");
        $first.appendTo(".banner-slides")
            .css("left", `${_numSlides * 100}%`);
        $last.prependTo(".banner-slides")
            .css("left", "-100%");

        _$allSlides = $("#banner>.banner-slides").children();

        // Dragging
        var isDragging = false;
        var dragStartX = 0;
        var distDragged = 0;

        function DragEnd() {
            isDragging = false;
            $(this).css("cursor", "default");
            if (distDragged > 2)
                Move(_current - 1);
            else if (distDragged < -2)
                Move(_current + 1);
            else Move(_current);
            distDragged = 0;
        }

        $("#banner>.banner-slides").on({
            mousedown: function (e) {
                if (e.which === 1 && !_$allSlides.is(":animated")) {
                    dragStartX = e.offsetX;
                    $(this).css("cursor", "grabbing");
                    isDragging = true;
                    clearTimeout(_timeout);
                }
            },
            mousemove: function (e) {
                if (isDragging) {
                    let width = $(this).width();
                    let percent = (e.offsetX - dragStartX) / width * 100;
                    distDragged += percent;
                    _$allSlides.css("left", `+=${percent}%`);
                }
            },
            mouseup: DragEnd,
            mouseleave: DragEnd

        })

        var touchStartX = 0;
        $("#banner").on("touchstart", function(e) {
            touchStartX = e.touches[0].clientX;
        });
        $("#banner").on("touchmove", function(e) {
            let width = $(this).width();
            let percent = (e.touches[0].clientX - touchStartX) / width * 100;
            touchStartX = e.touches[0].clientX;
            distDragged += percent;
            _$allSlides.css("left", `+=${percent}%`);
        })
        $("#banner").on("touchend", DragEnd);
    }

    function GetCurrent() {
        return _current;
    }

    function Move(dest) {

        // Do nothing if slide is already showing or animation in progress
        if (_$allSlides.is(":animated") || _current === dest) {
            return;
        }

        Advance();

        _buttons[_current].removeClass("active");

        if (dest === -1)
            _current = _numSlides - 1;
        else if (dest === _numSlides)
            _current = 0;
        else
            _current = dest;
        _buttons[_current].addClass("active");


        _$allSlides.each(function (i) {
            $(this).animate({
                left: `${100 * ((i - 1) - dest)}%`
            },
                function () {
                    if (dest === -1) {
                        $(this).css("left", `${-(_numSlides - i) * 100}%`);
                    }
                    else if (dest === _numSlides) {
                        $(this).css("left", `${(i - 1) * 100}%`);
                    }
                })
        });

    }

    function Advance() {
        clearTimeout(_timeout);

        _timeout = setTimeout(function () {
            Move(_current + 1);
        }, 4000);
    }

    return { Init: Init, Advance: Advance, GetCurrent: GetCurrent, Move: Move };
}(jQuery));
//# sourceMappingURL=all.js.map
