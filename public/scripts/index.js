(function($) { 
    "use strict";  // Ensure that the code runs in strict mode

    $(function() {
        var header = $(".start-style");  // Select the header with class 'start-style'
        
        // Change the header style on scroll
        $(window).scroll(function() {    
            var scroll = $(window).scrollTop();  // Get the current scroll position

            // If scrolled more than 10 pixels
            if (scroll >= 10) {
                header.removeClass('start-style').addClass("scroll-on");  // Change classes for style
            } else {
                header.removeClass("scroll-on").addClass('start-style');  // Revert to original style
            }
        });
    });		
		
    // Animation on document ready
    $(document).ready(function() {
        $('body.hero-anime').removeClass('hero-anime');  // Remove 'hero-anime' class on load
    });

    // Menu On Hover
    $('body').on('mouseenter mouseleave', '.nav-item', function(e) {
        // Check if window width is greater than 750 pixels
        if ($(window).width() > 750) {
            var _d = $(e.target).closest('.nav-item');  // Get the closest nav-item to the event target
            _d.addClass('show');  // Add 'show' class to the hovered nav item

            // Set a timeout to remove 'show' class if mouse leaves
            setTimeout(function() {
                _d[_d.is(':hover') ? 'addClass' : 'removeClass']('show');  // Toggle 'show' class
            }, 1);
        }
    });	
})(jQuery);
