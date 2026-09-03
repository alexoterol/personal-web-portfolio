(function ($) {
    "use strict";

    var $window = $(window);
    var SCROLL_DURATION = 1500;

    // Toggle the elements that depend on scroll position from a single handler.
    // The last applied state is cached so the fade animations are not re-queued
    // on every scroll event.
    var navbarShown = null;
    var scrollCueShown = null;

    $window.on('scroll', function () {
        var scrollTop = $window.scrollTop();
        var pastHeader = scrollTop > 200;
        var nearTop = scrollTop <= 100;

        if (pastHeader !== navbarShown) {
            navbarShown = pastHeader;

            if (pastHeader) {
                $('.navbar').fadeIn('slow').css('display', 'flex');
                $('.back-to-top').fadeIn('slow');
            } else {
                $('.navbar').fadeOut('slow').css('display', 'none');
                $('.back-to-top').fadeOut('slow');
            }
        }

        if (nearTop !== scrollCueShown) {
            scrollCueShown = nearTop;
            $('.scroll-to-bottom')[nearTop ? 'fadeIn' : 'fadeOut']('slow');
        }
    });


    // Smooth scrolling on the navbar links
    $('.navbar-nav a').on('click', function (event) {
        if (!this.hash) {
            return;
        }

        var $target = $(this.hash);

        if (!$target.length) {
            return;
        }

        event.preventDefault();

        $('html, body').animate({
            scrollTop: $target.offset().top - 45
        }, SCROLL_DURATION, 'easeInOutExpo');

        if ($(this).parents('.navbar-nav').length) {
            $('.navbar-nav .active').removeClass('active');
            $(this).addClass('active');
        }
    });


    // Typed Initiate
    var $typedOutput = $('.typed-text-output');

    if ($typedOutput.length === 1) {
        new Typed('.typed-text-output', {
            strings: $('.typed-text').text().split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }


    // Modal Video
    var videoSrc = '';

    $('.btn-play').on('click', function () {
        videoSrc = $(this).data('src');
    });

    $('#videoModal')
        .on('shown.bs.modal', function () {
            $('#video').attr('src', videoSrc + '?autoplay=1&modestbranding=1&showinfo=0');
        })
        // Clearing the source stops playback instead of reloading the player
        .on('hide.bs.modal', function () {
            $('#video').attr('src', '');
        });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-flters button').on('click', function () {
        $('#portfolio-flters button').removeClass('active').attr('aria-pressed', 'false');
        $(this).addClass('active').attr('aria-pressed', 'true');

        portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });


    // Back to top button
    $('.back-to-top').on('click', function (event) {
        event.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, SCROLL_DURATION, 'easeInOutExpo');
    });


    // Testimonials carousel
    $('.testimonial-carousel').owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1
    });

})(jQuery);
