$(document).ready(function(){
    $('.carousel').rabbitCarousel({
        timeout: 4000
    });
  });


; (function ($, window, document, undefined) {
    function Rabbit(element, options) {

        this.options = $.extend({}, Rabbit.defaults, options);
        this.element = $(element);
        this._handlers = {};
        this._current = null;
        //
        this.setup();
        this.initialize();  
    }


    //default options
    Rabbit.defaults = { 
        autoplay: false,
        timeout: 6000,
        animation: "fade", //slide, fade, instant
        pager: false, //false or provide selector for container
        numVisible: 1
    }


        Rabbit.prototype.setup = function() {
            console.log(this.options) 
        }

    //initialize
    Rabbit.prototype.initialize = function() {
       
    }

    //jquery constructor
    $.fn.rabbitCarousel = function(option) {
		var args = Array.prototype.slice.call(arguments, 1);

		return this.each(function() {
			var $this = $(this),
				data = $this.data('rabbit.carousel');

			if (!data) {
				data = new Rabbit(this, typeof option == 'object' && option);
				$this.data('rabbit.carousel', data);
			}

			if (typeof option == 'string' && option.charAt(0) !== '_') {
				data[option].apply(data, args);
			}
		});
	};
    $.fn.rabbitCarousel.Constructor = Rabbit;
})(window.jQuery, window, document);