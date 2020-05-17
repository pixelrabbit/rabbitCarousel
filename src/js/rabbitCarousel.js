function rabbitCarousel(options) {

    // merge user provided options over defaults
    this._options = Object.assign({

        stage: ".carousel__stage",
        container: ".carousel__container",
        slides: ".carousel__slide",

        prev: ".btn--prev",
        next: ".btn--next",

        pager: ".carousel__pager",
        pagerLabel: "Choose item to display",
        buttonLabel: "View item #", //# is the item number

        startIndex: 0, //TODO
        loop: false, //TODO

        swipe: true,
        swipeThreshold: 50,

        autoplay: false,
        timeout: 6000,
        stopOnInteraction: true,

        animation: "slide", //TODO: slide, fade, instant
        easing: "ease-in-out",
        duration: 250,

        itemWidthPct: 1, // 1 or decimal
        perPage: 1,
        breakpoints: false,

        onInit: function () { }, //args: carousel reference
        onBefore: function () { }, //args: current, next
        onAfter: function () { } //args: current, prev

    }, options);
    //
    //
    // REFERENCES
    this._stage = null;
    this._container = null;
    this._slides = [];
    this._current = 0;
    this._controls = {};
    this._pager = null;

    this._breakpoints = null;
    this._stageconfig = null;
    this._autoplayTimer;
    this._swipe = {};
    this._offset = 0;
    //
    //
    //set item width
    this.setItemWidth = function () {
        // console.log("setItemWidth", this._stage, this._slides);
        var stageWidth = this._stage.offsetWidth;
        var itemWidth = stageWidth / this._getOption("perPage");
        this._slides.forEach(function (slide, i) {
            var width = itemWidth;

            //if slide width is percentage
            if (this._getOption("itemWidthPct")) {
                width = width * this._getOption("itemWidthPct");
            }

            width = Math.ceil(width);
            slide.width = width;
            slide.el.style.width = width + "px";
        }.bind(this))
    }
    //
    //set container width
    this.setContainerWidth = function () {
        var containerWidth = 0;
        this._slides.forEach(function (el, i) {
            containerWidth += el.width;
        })
        this._container.style.width = containerWidth + "px";
    }
    //
    //
    // STAGE
    this.setStage = function () {

        //set item width if breakpoints is set
        this.setItemWidth();
        this.setContainerWidth();
        //set x coordinates
        window.setTimeout(function () {
            this._slides.forEach(function (slide, i) {
                slide.x = slide.el.offsetLeft
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
        info["length"] = this._slides.length;
        info["current"] = this._current;
        info["numPages"] = Math.ceil(this._slides.length / this._stageconfig.perPage);
        return info;
    }
    //
    //
    // RESIZE HANDLER
    this._resizeHandler = function (e) {
        var vw = window.innerWidth || document.documentElement.clientWidth;
        if (this._breakpoints) {
            this._breakpoints.forEach(function (bp, i) {
                bp = Number(bp)
                if (vw > bp) {
                    this._stageconfig = this._options.breakpoints[bp];
                }
            }.bind(this))
        }
        this.setStage();
    }
    //
    //
    // SWIPABLE
    this._makeSwipable = function () {
        this._container.addEventListener('touchstart', swipeStart.bind(this));
        this._container.addEventListener('mousedown', swipeStart.bind(this));
        this._container.addEventListener('touchmove', swipeMove.bind(this));
        this._container.addEventListener('mousemove', swipeMove.bind(this));
        this._container.addEventListener('touchend', swipeEnd.bind(this))
        this._container.addEventListener('mouseup', swipeEnd.bind(this))
        //TODO: swipes with pointer/cursor

        function unifyEvent(e) { return e.changedTouches ? e.changedTouches[0] : e };
        function swipeStart(e) {
            // ignore swipes starting in form fields
            if (['TEXTAREA', 'OPTION', 'INPUT', 'SELECT', 'BUTTON'].indexOf(unifyEvent(e).target.nodeName) !== -1) {
                this._swipe = {};
                return;
            }
            this._swipe.start = unifyEvent(e).clientX;
            this._swipe.down = true;
        }
        function swipeMove(e){
            if(this._swipe.down){
                console.log(unifyEvent(e).pageX)
                var dragOffset = this._offset - unifyEvent(e).offsetX;
                this._container.style.transform = "translateX(" + dragOffset + "px)";
            }
        }
        function swipeEnd(e) {
            this._swipe.end = unifyEvent(e).clientX;
            this._swipe.down = false;
            if (Math.abs(this._swipe.start - this._swipe.end) > this._options.swipeThreshold) {
                if (this._swipe.end > this._swipe.start) {
                    this.prev();
                } else {
                    this.next();
                }
                this._swipe = {};
            }
        }
    }
    //
    //
    // TO
    this.to = function (i, instant) {
        if (typeof this._slides[i] !== 'undefined') {
            this._options.onBefore(this._current, i);
            var prevItem = this._current;
            this._current = i;
            this._offset = this._slides[i].x * -1;
            var transformValue = "translateX(" + this._offset + "px)"
            this._container.style.transform = transformValue;
            //this._container.style.webkitTransform = transformValue;
            window.setTimeout(function () {
                this._options.onAfter(this._current, prevItem);
            }.bind(this), this._options.duration);
            this._updatePager();
            this._updateControls();
        }
        return this;
    }
    //
    //
    // PREV
    this.prev = function (e) {
        var increment = (this._getOption("perPage")) ? this._getOption("perPage") * 1 : 1;
        var targetItemIndex = this._current - increment;
        this.to(targetItemIndex);
        return this;
    }
    // NEXT
    this.next = function (e) {
        var increment = (this._getOption("perPage")) ? this._getOption("perPage") * 1 : 1;
        var targetItemIndex = this._current + increment;
        this.to(targetItemIndex);
        return this;
    }
    //
    //
    // PAGER
    this._createPager = function () {
        if (this._pager) {
            this._setAttributes(this._pager, {
                "aria-label": this._options.pagerLabel
            })
            this._slides.forEach(function (slide, i) {
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

                slide["button"] = button;
            }.bind(this))
        }
    }
    //
    //
    // UPDATE PAGER
    this._updatePager = function () {
        if (this._pager) {
            this._slides.forEach(function (slide, i) {
                if (i === this._current) {
                    slide.button.classList.add("current");
                } else {
                    slide.button.classList.remove("current");
                }
            }.bind(this))
        }
    }
    // UPDATE CONTROLS
    this._updateControls = function () {
        if (!this._options.loop) {
            if (this._controls.prev || this._controls.next) {
                if (this._current <= 0) {
                    this._controls.prev.setAttribute("aria-disabled", "true");
                } else {
                    this._controls.prev.setAttribute("aria-disabled", "false");
                }
                if (this._current >= this._slides.length - 1) {
                    this._controls.next.setAttribute("aria-disabled", "true");
                } else {
                    this._controls.next.setAttribute("aria-disabled", "false");
                }
            }
        }
    }
    //
    //
    // AUTOPLAY
    this.autoplay = function () {
        if (this._options.autoplay) {
            this._autoplayTimer = window.setInterval(function () {
                if (typeof this._slides[this._current + 1] === 'undefined') {
                    this.to(0);
                } else {
                    this.next();
                }
            }.bind(this), this._options.timeout)
        }
    }
    //
    //
    // INTIALIZE
    this.initialize = function () {

        //identify stage
        this._stage = document.querySelectorAll(this._options.stage)[0];
        //identify container
        this._container = this._stage.querySelectorAll(this._options.container)[0];
        //identify slides
        this._stage.querySelectorAll(this._options.slides).forEach(function (item, i) {
            var item = {
                el: item,
                width: item.offsetWidth,
                height: item.offsetHeight
            }
            this._slides.push(item);
        }.bind(this));

        //identify pager if it exists
        if (this._stage.querySelectorAll(this._options.pager)[0]) {
            this._pager = this._stage.querySelectorAll(this._options.pager)[0]
        }

        // make array of numbers from breakpoints option
        if (this._options.breakpoints) {
            this._breakpoints = Object.keys(this._options.breakpoints).map(Number).sort(function (a, b) { return a - b });
        }

        // bind resize handler
        ['load', 'resize'].forEach(function (e) {
            window.addEventListener(e, this._debounce(this._resizeHandler.bind(this)));
        }.bind(this))

        //reference and bind controls
        this._controls.prev = this._stage.querySelectorAll(this._options.prev)[0]
        if (this._controls.prev) {
            this._controls.prev.addEventListener('click', function () {
                this.prev()
            }.bind(this));
        }
        this._controls.next = this._stage.querySelectorAll(this._options.next)[0]
        if (this._controls.next) {
            this._controls.next.addEventListener('click', function () {
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
        this._updatePager();
        this._updateControls();

        //start autoplay
        this.autoplay();
        if (this._options.stopOnInteraction) {
            //TODO: remove event listener on interaction
            this._stage.addEventListener('mouseenter', function () {
                clearInterval(this._autoplayTimer);
            }.bind(this))
        }

        if (this._options.swipe) {
            this._makeSwipable();
        }

        this._options.onInit(this);
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
        if (this._stageconfig && this._stageconfig.hasOwnProperty(key)) {
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

// forEach polyfill
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}
// object.assign polyfill
if (typeof Object.assign !== 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) { // .length of function is 2
            'use strict';
            if (target === null || target === undefined) {
                throw new TypeError('Cannot convert undefined or null to object');
            }
            var to = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];
                if (nextSource !== null && nextSource !== undefined) {
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    });
}
// object.keys polyfill
if (!Object.keys) {
    Object.keys = function (obj) {
        var keys = [];
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                keys.push(i);
            }
        }
        return keys;
    };
}