function rabbitCarousel(options) { 

    // merge user provided options over defaults
    this._options = Object.assign({
        stage: ".carousel__stage",
        container: ".carousel__container",
        items: ".carousel__item",

        prev: ".btn--prev",
        next: ".btn--next",

        pager: ".carousel__pager",
        pagerLabel: "Choose item to display",
        buttonLabel: "View item #", //# is the item number

        startIndex: 0, //TODO
        autoplay: false, //TODO
        circular: false, //TODO
        timeout: 6000, //TODO

        animation: "slide", //TODO: slide, fade, instant
        easing: "ease-in-out",
        duration: 250,

        itemWidthPct: 1, // false or decimal; TODO: for peekaboo style
        perPage: 1,
        breakpoints: false
    }, options);
    //
    //
    // REFERENCES
    this._stage = null;
    this._container = null;
    this._items = [];
    this._current = null;
    this._controls = {};
    this._pager = null;

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
            var width = itemWidth;

            //if item width is percentage
            if (this._getOption("itemWidthPct")) {
                width = width * this._getOption("itemWidthPct");
            }

            width = Math.ceil(width);
            item.width = width;
            item.el.style.width = width + "px";
        }.bind(this))
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
        window.setTimeout(function () {
            this._items.forEach(function (item, i) {
                item.x = item.el.offsetLeft
            });
        }.bind(this), 200)

        //set current
        this._current = 0;

    }
    //
    //
    // SLIDE INFO - return object of current slide(s)
    this.info = function () {
        var info = {};
        info["length"] = this._items.length;
        info["current"] = this._current;
        info["numPages"] = Math.ceil(this._items.length / this._stageconfig.perPage);
        return info;
    }
    //
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
        this.setStage();
    }
    //
    // the main function for animating carousel
    this.to = function (i) {
        if (typeof this._items[i] !== 'undefined') {
            console.log("to", i);
            this._current = i;
            var offset = this._items[i].x * -1;
            this._container.style.transform = `translateX(${offset}px)`;
            this._container.style.webkitTransform = `translateX(${offset}px)`;
        }
        return this;
    }
    //
    //
    // PREV
    this.prev = function (e) {
        var increment = (this._stageconfig.perPage) ? this._stageconfig.perPage * 1 : 1;
        var targetItemIndex = this._current - increment;
        this.to(targetItemIndex);
        return this;
    }
    // NEXT
    this.next = function (e) {
        var increment = (this._stageconfig.perPage) ? this._stageconfig.perPage * 1 : 1;
        var targetItemIndex = this._current + increment;
        this.to(targetItemIndex);
        return this;
    }
    //
    //
    // PAGER
    this._createPager = function () {
        if (this._options.pager) {
            this._pager = this._stage.querySelectorAll(this._options.pager)[0];
            this._setAttributes(this._pager, {
                "aria-label": this._options.pagerLabel
            })
            this._items.forEach(function (item, i) {
                var span = document.createElement("span");
                span.textContent = this._options.buttonLabel.replace("#", i)
                var button = document.createElement("button");
                this._setAttributes(button, {
                    type: "button"
                })
                button.appendChild(span);
                button.addEventListener("click", function () {
                    this.to(i);
                }.bind(this))
                var li = document.createElement("li").appendChild(button);
                this._pager.appendChild(li);
            }.bind(this))
        }
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
        if (prevBtn) {
            this._controls._prev = prevBtn;
            this._controls._prev.addEventListener('click', function () {
                this.prev()
            }.bind(this));
        }
        var nextBtn = this._stage.querySelectorAll(this._options.next)[0]
        if (nextBtn) {
            this._controls._next = nextBtn;
            this._controls._next.addEventListener('click', function () {
                this.next()
            }.bind(this));
        }

        //enable transition on container
        if (this._options.animation == "slide") {
            this._container.style.webkitTransition = "all " + this._options.duration + "ms " + this._options.easing;
            this._container.style.transition = "all " + this._options.duration + "ms " + this._options.easing;
        }

        //create pager
        this._createPager();


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
    this._getOption = function (key) {
        var option;
        // check general options first
        if (this._options[key]) {
            option = this._options[key];
        }
        // then check breakpoint options
        if (this._stageconfig.hasOwnProperty(key)) {
            option = this._stageconfig[key]
        }
        return option;
    }
    this._setAttributes = function (el, attrs) {
        for (var key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    }
    //
    //
    //
    this.initialize();
}











$(document).ready(function () {
    window.carousel = new rabbitCarousel({
        breakpoints: {
            0: {
                perPage: 1,
                itemWidthPct: 0.9
            },
            480: {
                perPage: 2,
                itemWidthPct: 0.95
            },
            968: {
                perPage: 3
            }
        }
    });
    // document.querySelector('.btn--prev').addEventListener('click', function (e) { carousel.prev(e) 
    // });
    // document.querySelector('.btn--next').addEventListener('click', function (e) { carousel.next(e) 
    // });
});
