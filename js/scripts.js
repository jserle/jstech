jQuery(document).ready(function () {

    "use strict";

    // Scroll Behaviour

    jQuery(function () {

        var $window = jQuery(window);
        var scrollTime = 0.3;
        var scrollDistance = 190;

        $window.on("mousewheel DOMMouseScroll", function (event) {


            var delta = event.originalEvent.wheelDelta / 120 || -event.originalEvent.detail / 3;
            var scrollTop = $window.scrollTop();
            var finalScroll = scrollTop - parseInt(delta * scrollDistance);

            if (delta != 1 && delta != -1) {
               
            } else {



                event.preventDefault();

                TweenMax.to($window, scrollTime, {
                    scrollTo: {
                        y: finalScroll,
                        autoKill: true
                    },
                    ease: Power1.easeOut,
                    overwrite: 5
                });

            }



        });
    });

    // Loader bar

    var count = 1;

    jQuery('img').load(function () {

        jQuery('#progress-bar').css('width', count * 170);
        count = count + 1;
    });

    jQuery('#loader').css('padding-top', jQuery(window).height() / 2);

    // Smooth Scroll to internal links

    jQuery('.smooth-scroll').smoothScroll({
        speed: 900,
        offset: -92
    });

    // Initialize Sliders

    jQuery('#home-slider').flexslider({
        directionNav: false,
        animationSpeed: 400
    });

    jQuery('.testimonials-slider').flexslider({
        directionNav: false,
        slideshow: false
    });


    // Append HTML <img>'s as CSS Background for slides
    // also center the content of the slide and dividers


    jQuery('#home-slider .slides li').each(function () {

        jQuery(this).css('height', jQuery(window).height());

        var imgSrc = jQuery(this).children('.slider-bg').attr('src');
        jQuery(this).css('background', 'url("' + imgSrc + '")');
        jQuery(this).children('.slider-bg').remove();

        var slideHeight = jQuery(this).height();
        var contentHeight = jQuery(this).children('.slide-content').height();
        var padTop = (slideHeight / 2) - (contentHeight / 2);

        jQuery(this).children('.slide-content').css('padding-top', padTop);

    });

    jQuery('.text-divider').each(function () {

        var imgSrc = jQuery(this).children('.divider-bg').attr('src');
        jQuery(this).css('background', 'url("' + imgSrc + '")');
        jQuery(this).children('.divider-bg').remove();

    });

    // Turn dynamic animations for iOS devices (because it doesn't look right)

    var iOS = false,
        p = navigator.platform;

    if (p === 'iPad' || p === 'iPhone' || p === 'iPod') {
        iOS = true;
    }

    // Sticky Nav

    jQuery(window).scroll(function () {

        if (jQuery(window).scrollTop() > 400) {
            jQuery('#navigation').addClass('sticky-nav');
        } else {
            jQuery('#navigation').removeClass('sticky-nav');
        }

        // Parallax

        if (iOS === false) {

            jQuery('.has-parallax').each(function () {

                var scrollAmount = jQuery(window).scrollTop() / 3;
                scrollAmount = Math.round(scrollAmount);
                jQuery(this).css('backgroundPosition', '50% ' + scrollAmount + 'px');

            });

            var rightScrollAmount = jQuery(window).scrollTop() / 22;
            rightScrollAmount = Math.round(rightScrollAmount);
            jQuery('.has-pan-left').css('backgroundPosition', '0' + rightScrollAmount + 'px');


            var leftScroll = (-rightScrollAmount + 100);
            jQuery('.has-pan-right').css('backgroundPosition', +leftScroll + 'px');



        }
    });

    // Portfolios

    jQuery('.filters li').click(function () {

        jQuery('.filters li').children('.btn').removeClass('active');
        jQuery(this).children('.btn').addClass('active');

        var category = jQuery(this).attr('data-category');
        jQuery(this).closest('.projects-wrapper').find('.project').removeClass('hide-project');

        if (category !== 'all') {
            jQuery(this).closest('.projects-wrapper').find('.project').each(function () {

                if (!jQuery(this).hasClass(category)) {
                    jQuery(this).addClass('hide-project');
                }

            });
        }

    });

    // Project Clicks with AJAX call

    jQuery('.project').click(function (event) {
        event.preventDefault();
        var projectContainer = jQuery(this).closest('.projects-wrapper').children('.ajax-container').attr('data-container');

        if (jQuery('.ajax-container[data-container="' + projectContainer + '"]').hasClass('open-container')) {
            jQuery('.ajax-container[data-container="' + projectContainer + '"]').addClass('closed-container');
            jQuery('.ajax-container[data-container="' + projectContainer + '"]').removeClass('open-container');
        }

        var fileID = jQuery(this).attr('data-project-file');

        if (fileID != null) {
            jQuery('html,body').animate({
                scrollTop: jQuery('.ajax-container[data-container="' + projectContainer + '"]').offset().top - 70
            }, 500);

        }

        jQuery('.ajax-container[data-container="' + projectContainer + '"]').load(fileID + " .project-body", function () {
            jQuery('.ajax-container[data-container="' + projectContainer + '"]').addClass('open-container');
            jQuery('.close-project').click(function () {
                jQuery('.ajax-container').addClass('closed-container');
                jQuery('.ajax-container').removeClass('open-container');
                jQuery('html,body').animate({
                    scrollTop: jQuery('.projects-container').offset().top - 70
                }, 500);
                setTimeout(function () {
                    jQuery('.ajax-container').html('');
                }, 1000);
            });
            jQuery('.project-slider').flexslider({
                directionNav: false
            });
            jQuery('.ajax-container[data-container="' + projectContainer + '"]').removeClass('closed-container');

            jQuery('.close-project').click(function () {
                jQuery('.ajax-container[data-container="' + projectContainer + '"]').addClass('closed-container');
                jQuery('.ajax-container[data-container="' + projectContainer + '"]').removeClass('open-container');
                jQuery('html,body').animate({
                    scrollTop: jQuery('.project-container[data-container="' + projectContainer + '"]').offset().top - 70
                }, 500);
                setTimeout(function () {
                    jQuery('.ajax-container[data-container="' + projectContainer + '"]').html('');
                }, 1000);
            });
        });

    });

    // Mobile Toggle for nav menu

    jQuery('.mobile-toggle').click(function () {
        if (jQuery('#navigation').hasClass('open-nav')) {
            jQuery('#navigation').removeClass('open-nav');
        } else {
            jQuery('#navigation').addClass('open-nav');
        }
    });

    // Map

    // When the window has finished loading create our google map below
    google.maps.event.addDomListener(window, 'load', init);

    function init() {
        // Basic options for a simple Google Map
        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
        var mapOptions = {
            // How zoomed in you want the map to start at (always required)
            zoom: 14,
            mapTypeControl: false,

            // The latitude and longitude to center the map (always required)
            center: new google.maps.LatLng(42.026551, -87.722879), // New York

            // How you would like to style the map. 
            // This is where you would paste any style found on Snazzy Maps.
            styles: [{
                "featureType": "landscape",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 65
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "poi",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 51
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road.highway",
                "stylers": [{
                    "saturation": -100
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road.arterial",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 30
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "road.local",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 40
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "transit",
                "stylers": [{
                    "saturation": -100
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "administrative.province",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "lightness": -25
                }, {
                    "saturation": -100
                }]
            }, {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "hue": "#ffff00"
                }, {
                    "lightness": -25
                }, {
                    "saturation": -97
                }]
            }]
        };

        // Get the HTML DOM element that will contain your map 
        // We are using a div with id="map" seen below in the <body>
        var mapElement = document.getElementById('map');

        // Create the Google Map using out element and options defined above
        var map = new google.maps.Map(mapElement, mapOptions);

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(42.026551, -87.722879),
            map: map,
            title: 'Hello World!'
        });
    }




});

jQuery(window).load(function () {

    "use strict";

    // Remove loader

    jQuery('#progress-bar').width('100%');
    jQuery('#loader').hide();

});