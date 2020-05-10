$(document).ready(function () {
    $('.carousel__stage').rabbitCarousel({
        timeout: 4000
    });
});


; (function ($, window, document, undefined) {
    function Rabbit(element, options) {

        this.options = Object.assign(Rabbit.defaults, options);
        //this.element = $(element);
        this.items = [];
        this._handlers = {};
        this._current = null;
        //
        this.setStage();
        this.initialize();
    }


    //default options
    Rabbit.defaults = {
        stage: ".carousel__stage",
        container: ".carousel__container",
        items: ".carousel__item",
        
        autoplay: false,
        circular: false,
        timeout: 6000,
        animation: "fade", //slide, fade, instant
        pager: false, //false or provide selector for container
        numVisible: 1
    }


    Rabbit.prototype.setStage = function () {

        //setup items
        var items = this.items;
        $(this.element).find(this.options.items).each(function(index,el){
            var item = {
                el: $(el),
                width: $(el).width(),
                height: $(el).height()
            }
            items.push(item);
        });
        
        //set container width
        var containerWidth = 0;
        this.items.forEach(function(item, i){
            containerWidth += item.width;
        })
        $(this.options.container).css('width', containerWidth+"px");

        //set current
        this._current = 0;

        //console.log(this.items)
    }

    //initialize
    Rabbit.prototype.initialize = function () {
        this.items.forEach(function(item,i){
            item.x = $(item.el).position().left;
        })
        console.log(this.items)
    }

    Rabbit.prototype.to = function (targetItem) {

    }
    // next and prev are shortcuts of to method
    Rabbit.prototype.next = function () {

    }
    Rabbit.prototype.prev = function () {

    }

    //jquery constructor
    $.fn.rabbitCarousel = function (option) {
        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function () {
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