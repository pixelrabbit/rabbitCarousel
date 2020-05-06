// this is a plugin for jquery
(function ($) {
    $.fn.rabbitCarousel = function(options) {
 
        var settings = $.extend({
            autoplay: false,
            timeout: 6000,
            animation: "fade", //slide, fade, instant
            pager: false, //false or provide selector for container
            numVisible: 1
        }, options );
 
        return this;
    };
}(jQuery));