function rabbitCarousel(options) {

    // merge user provided options over defaults
    this.options = Object.assign({
        stage: ".carousel__stage",
        container: ".carousel__container",
        items: ".carousel__item",

        startIndex: 0, //TODO
        autoplay: false, //TODO
        circular: false, //TODO
        timeout: 6000, //TODO

        animation: "slide", //TODO: slide, fade, instant
        easing: "ease-in-out",
        duration: 400,

        breakpoints: {
            0: {
                perPage: 1
            },
            768: {
                perPage: 2
            },
            1024: {
                perPage: 3
            }
        },
        pager: false //TODO: false or provide selector for container
    }, options);

    this.stage = null;
    this.container = null;
    this.items = [];
    this._current = null;
    //
    // resize handler
    this.resizeHandler = function(){
        var width = document.body.clientWidth;
        console.log(width)
    }
    //
    //set item width
    this.setItemWidth = function () {
            var stageWidth = this.stage.offsetWidth;
            var itemWidth = stageWidth / this.options.perPage;
            this.items.forEach(function (item, i) {
                item.style.width = Math.ceil(itemWidth) + "px"
            })
    }
    //
    // the main function for animating carousel
    this.to = function (i) {
        console.log("to", i);

        var offset = this.items[i].x * -1;
        this.container.style.transform = `translateX(${offset}px)`;
        this.container.style.webkitTransform = `translateX(${offset}px)`;
    }
    //
    // next and prev are shortcuts of to method
    this.prev = function () {
        var increment = (this.options.perPage) ? this.options.perPage * 1 : 1;
        this._current = this._current - increment;
        this.to(this._current)
    }
    this.next = function () {
        var increment = (this.options.perPage) ? this.options.perPage * 1 : 1;
        this._current = this._current + increment;
        this.to(this._current)
    }
    //
    this.initialize = function () {
        console.log("initialize", this.items);

        // bind resize handler
        ['resize'].forEach(function(e){
            window.addEventListener(e, this.debounce(this.resizeHandler));
        }.bind(this))
       

        //set x coordinates
        this.items.forEach(function (item, i) {
            item.x = item.el.offsetLeft
        });

        //enable transition on container
        if (this.options.animation == "slide") {
            this.container.style.webkitTransition = `all ${this.options.duration}ms ${this.options.easing}`;
            this.container.style.transition = `all ${this.options.duration}ms ${this.options.easing}`;
        }
    }
    //
    this.debounce = function(func){
        var wait = arguments.length <= 1 || arguments[1] === undefined ? 200 : arguments[1];
      
        var timeout = void 0;
        return function () {
          var _this = this;
      
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
      
          clearTimeout(timeout);
          timeout = setTimeout(function () {
            func.apply(_this, args);
          }, wait);
        };
      }
    //
    //
    this.setStage();
    this.initialize();
}


//default options


rabbitCarousel.prototype.setStage = function () {
    console.log("setStage");

    //identify stage
    this.stage = document.querySelectorAll(this.options.stage)[0];
    //identify container
    this.container = document.querySelectorAll(this.options.container)[0];
    //identify items
    this.items = this.stage.querySelectorAll(this.options.items);

    //set item width if breakpoints is set
    if (this.options.breakpoints) {
    this.setItemWidth();
    }

    //transform items array to array of objects with data
    var itemsArr = []
    this.items.forEach(function (item, i) {
        var item = {
            el: item,
            width: item.offsetWidth,
            height: item.offsetHeight
        }
        itemsArr.push(item);
    });
    this.items = itemsArr;



    //set container width
    var containerWidth = 0;
    this.items.forEach(function (el, i) {
        containerWidth += el.width;
    })
    this.container.style.width = containerWidth + "px";

    //set current
    this._current = 0;

}

//initialize










$(document).ready(function () {
    var carousel = new rabbitCarousel({
        duration: 1200,
        perPage: 2
    });
    document.querySelector('.btn--prev').addEventListener('click', function () { carousel.prev() });
    document.querySelector('.btn--next').addEventListener('click', function () { carousel.next() });
});
