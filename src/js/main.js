$(document).ready(function () {
    $('.nav-list li').hover(function () {
        $(this).addClass('active-nav');
        $(this).siblings().removeClass('active-nav');
    });

// Pagination ---------------------------------

    $('.pagination li').hover(function () {
        $('.pagination li a').removeClass('active-page');
        $(this).find("a").addClass('active-page');
    });

// -----------XS Menu-----------------------------------


    $(window).on('resize', function () {
        if (window.matchMedia('(max-width: 767px)').matches) {
            $('.main-nav').hide();
            $('.hide-show-btn').show();
        } else if (window.matchMedia('(min-width: 768px)').matches) {
            $('.hide-show-btn').hide();
            $('.main-nav').show();
        }
    });

    var flag = true;
    $('.hide-show-btn').on('click', function () {
        if (flag) {
            flag = false;
            $('.main-nav').slideToggle(500, function () {
                flag = true;
            });
        }
    });

    //-----------------Rating Click------------------------

    $('.film-stars-block li button,.slider-rating-block li button').on('click', function () {
        if ($(this).hasClass('red')) {
            $(this).addClass('white').removeClass('red');
        }
        else {
            $(this).addClass('red').removeClass('white');
        }
    });


}); // конец ready