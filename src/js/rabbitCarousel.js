function rabbitCarousel(options) {

    // merge user provided options over defaults
    this._options = Object.assign({
        stage: ".carousel__stage",
        container: ".carousel__container",
        items: ".carousel__item",

        prev: ".btn--prev",
        next: ".btn--next",

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
            }
        },
        pager: false //TODO: false or provide selector for container
    }, options);
    //
    //
    // REFERENCES
    this._stage = null;
    this._container = null;
    this._items = [];
    this._current = null;
    this._controls = {};

    this._breakpoints = Object.keys(this._options.breakpoints).map(Number).sort(function (a, b) { return a - b }); // make array of numbers from breakpoints option
    this._stageconfig = null;
    //
    //
    //set item width
    this.setItemWidth = function () {
        //console.log("setItemWidth", this._items);
        var stageWidth = this._stage.offsetWidth;
        var itemWidth = stageWidth / this._stageconfig.perPage;
        this._items.forEach(function (item, i) {
            var width = Math.ceil(itemWidth)
            item.width = width;
            item.el.style.width = width + "px";
        })
    }
    //
    //set container width
    this.setContainerWidth = function () {
        var containerWidth = 0;
        this._items.forEach(function (el, i) {
            containerWidth += el.width;
        })
        this._container.style.width = containerWidth + "px";
    }
    //
    //
    // STAGE
    this.setStage = function () {
        console.log("setStage");


        //set item width if breakpoints is set
        if (this._options.breakpoints) {
            this.setItemWidth();
        }
        this.setContainerWidth();
        //set x coordinates
        this._items.forEach(function (item, i) {
            item.x = item.el.offsetLeft
        });

        //set current
        this._current = 0;

    }
    //
    // RESIZE HANDLER
    this._resizeHandler = function (e) {
        var vw = window.innerWidth || document.documentElement.clientWidth;
        this._breakpoints.forEach(function (bp, i) {
            bp = Number(bp)
            if (vw > bp) {
                this._stageconfig = this._options.breakpoints[bp];
            }
        }.bind(this))
        console.log(this._stageconfig)
        this.setStage();
    }
    //
    // the main function for animating carousel
    this.to = function (i) {
        if(typeof this._items[i] !== 'undefined') {
            console.log("to", i);
            this._current = i;
            var offset = this._items[i].x * -1;
            this._container.style.transform = `translateX(${offset}px)`;
            this._container.style.webkitTransform = `translateX(${offset}px)`;
        }
        return this;
    }
    //
    // next and prev are shortcuts of to method
    this.prev = function (e) {
        var increment = (this._stageconfig.perPage) ? this._stageconfig.perPage * 1 : 1;
        var targetItemIndex = this._current - increment;
        this.to(targetItemIndex);
        return this;
    }
    this.next = function (e) {
        var increment = (this._stageconfig.perPage) ? this._stageconfig.perPage * 1 : 1;
        var targetItemIndex = this._current + increment;
        this.to(targetItemIndex);
        return this;
    }
    //
    //
    // INTIALIZE
    this.initialize = function () {
        console.log("initialize");

        //identify stage
        this._stage = document.querySelectorAll(this._options.stage)[0];
        //identify container
        this._container = document.querySelectorAll(this._options.container)[0];
        //identify items
        this._stage.querySelectorAll(this._options.items).forEach(function (item, i) {
            var item = {
                el: item,
                width: item.offsetWidth,
                height: item.offsetHeight
            }
            this._items.push(item);
        }.bind(this));

        // bind resize handler
        ['load', 'resize'].forEach(function (e) {
            window.addEventListener(e, this._debounce(this._resizeHandler.bind(this)));
        }.bind(this))

        //reference and bind controls
        var prevBtn = this._stage.querySelectorAll(this._options.prev)[0]
        if(prevBtn) {
            this._controls._prev = prevBtn;
            this._controls._prev.addEventListener('click', function(){
                this.prev()
            }.bind(this));
        }
        var nextBtn = this._stage.querySelectorAll(this._options.next)[0]
        if(nextBtn) {
            this._controls._next = nextBtn;
            this._controls._next.addEventListener('click', function(){
                this.next()
            }.bind(this));
        }

        //enable transition on container
        if (this._options.animation == "slide") {
            this._container.style.webkitTransition = `all ${this._options.duration}ms ${this._options.easing}`;
            this._container.style.transition = `all ${this._options.duration}ms ${this._options.easing}`;
        }

        console.log(this)
    }
    //
    // HELPERS
    this._debounce = function (func) {
        var wait = arguments.length <= 1 || arguments[1] === undefined ? 100 : arguments[1];

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
    this.initialize();
}











$(document).ready(function () {
    window.carousel = new rabbitCarousel({
        duration: 1200,
        breakpoints: {
            0: {
                perPage: 1
            },
            480: {
                perPage: 2
            },
            1024: {
                perPage: 3
            }
        }
    });
    // document.querySelector('.btn--prev').addEventListener('click', function (e) { carousel.prev(e) 
    // });
    // document.querySelector('.btn--next').addEventListener('click', function (e) { carousel.next(e) 
    // });
});
