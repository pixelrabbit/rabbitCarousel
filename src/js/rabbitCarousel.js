//TODO: hooks for timeout progress
// count
// varying height
// keyboard controls

function rabbitCarousel(options) {

    // merge user provided options over defaults
    this._options = Object.assign({

        stage: ".carousel",
        container: ".carousel__container",
        slides: ".carousel__slide",

        prev: ".btn--prev",
        next: ".btn--next",

        pager: ".carousel__pager",
        pagerLabel: "Choose item to display",
        pagerButtonText: "View item #", //# is the item number
        progress: ".carousel__progress",

        startIndex: 0, //TODO
        loop: false,

        swipe: true,
        swipeThreshold: 10,

        autoplay: false,
        timeout: 6000,
        stopOnInteraction: false, //TODO this is broken with loop

        animation: "slide", //TODO: slide, fade, instant
        easing: "ease-in-out",
        duration: 250,

        itemWidthPct: 1, // 1 or decimal
        perPage: 1,
        advanceByPage: false,
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
    this._slidesAll = [];
    this._fauxslides = [];
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
        this._slidesAll.forEach(function (slide, i) {
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
        this._slidesAll.forEach(function (slide, i) {
            containerWidth += slide.width;
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
        this._slidesAll.forEach(function (slide, i) {
            slide.x = slide.el.offsetLeft
        });
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

        window.setTimeout(function () {
            this.to(this._current)
        }.bind(this), 10)
    }
    //
    //
    // SWIPABLE
    this._makeSwipable = function () {
        // passive:true at recommendation of chromium
        this._container.addEventListener('touchstart', swipeStart.bind(this), { passive: true });
        this._container.addEventListener('mousedown', swipeStart.bind(this), { passive: true });
        this._container.addEventListener('touchmove', swipeMove.bind(this), { passive: true });
        this._container.addEventListener('mousemove', swipeMove.bind(this), { passive: true });
        this._container.addEventListener('touchend', swipeEnd.bind(this), { passive: true })
        this._container.addEventListener('mouseup', swipeEnd.bind(this), { passive: true })
        this._container.addEventListener('mouseleave', swipeLeave.bind(this), { passive: true })
        //TODO: swipes with pointer/cursor

        function unifyEvent(e) { return e.changedTouches ? e.changedTouches[0] : e };
        function swipeStart(e) {
            e.stopPropagation();
            // ignore swipes starting in form fields or text elements
            if (['TEXTAREA', 'OPTION', 'INPUT', 'SELECT', 'BUTTON'].indexOf(unifyEvent(e).target.nodeName) !== -1) {
                this._swipe = {};
                return;
            }
            this._swipe.start = unifyEvent(e).pageX;
            this._swipe.pressed = true;
            this._unsetTransitionStyle();
        }
        function swipeMove(e) {
            e.stopPropagation();
            if (this._swipe.pressed) {
                var delta = unifyEvent(e).pageX - this._swipe.start;
                if (Math.abs(delta) > this._options.swipeThreshold) {
                    var dragOffset = this._offset + delta;
                    this._container.style.transform = "translateX(" + dragOffset + "px)";
                    this._container.classList.add("carousel__container--grabbing");
                }
            }
        }
        function swipeEnd(e) {
            e.stopPropagation();
            this._swipe.end = unifyEvent(e).pageX;
            this._swipe.pressed = false;
            if (Math.abs(this._swipe.end - this._swipe.start) > this._options.swipeThreshold) {
                if (this._swipe.end > this._swipe.start) {
                    if (this._current == 0) {
                        this.to(0)
                    } else {
                        this.prev()
                    }
                } else {
                    if (this._current == this._slidesAll.length - 1) {
                        this.to(this._slidesAll.length - 1)
                    } else {
                        this.next();
                    }
                }
            }
            this._swipe = {};
            this._setTransitionStyle();
            this._container.classList.remove("carousel__container--grabbing");
        }
        function swipeLeave(e) {
            e.stopPropagation();
            this._swipe = {};
            this._setTransitionStyle();
            this._container.classList.remove("carousel__container--grabbing");
            this.to(this._current);
            return;
        }
    }
    //
    //
    // TO
    this.to = function (i, cb) {
        if (typeof this._slidesAll[i] !== 'undefined') {
            this._options.onBefore(this._current, i);
            var prevItem = this._current;
            this._current = i;
            this._offset = this._slidesAll[i].x * -1;
            this._container.style.transform = "translateX(" + this._offset + "px)";
            window.setTimeout(function () {
                this._options.onAfter(this._current, prevItem);
                // for loops; if slide is clone then go instantly to actual item
                if(this._slidesAll[i].clone){
                    // var origIndex = this._slidesAll.indexOf(this._slides[i].clone);
                    // this._unsetTransitionStyle();
                    // this._container.style.transform = "translateX(" + this._slides[origIndex].x + "px)";
                }

                if(cb) cb();
            }.bind(this), this._options.duration);
            this._updatePager();
            this._updateControls();
        }
        return this;
    }
    //
    //
    // PREV
    this.prev = function (cb) {
        var increment = (this._getOption("perPage") && this._getOption("advanceByPage")) ? this._getOption("perPage") : 1;
        var targetItemIndex = this._current - increment;
        this.to(targetItemIndex, cb);
        return this;
    }
    // NEXT
    this.next = function (cb) {
        var increment = (this._getOption("perPage") && this._getOption("advanceByPage")) ? this._getOption("perPage") : 1;
        var targetItemIndex = this._current + increment;
        this.to(targetItemIndex, cb);
        return this;
    }
    //
    //
    // PAGER
    this._createPager = function () {
        if (this._pager) {
            this._pager.classList.add("carousel__pager");
            this._setAttributes(this._pager, {
                "aria-label": this._options.pagerLabel
            })
            this._slidesAll.forEach(function (slide, i) {
                if(slide.clone) return;
                var span = document.createElement("span");
                span.textContent = this._options.pagerButtonText.replace("#", i)
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
            this._slidesAll.forEach(function (slide, i) {
                if(slide.clone) return;
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
            if (this._progress) {
                var bar = this._progress.children[0];
                animateBar(this);
            }
            this._autoplayTimer = window.setInterval(function () {
                if (typeof this._slides[this._current + 1] === 'undefined') {
                    this.to(0);
                } else {
                    this.next();
                }
                if (this._progress) animateBar(this);
            }.bind(this), this._options.timeout);

            function animateBar(ref) {
                bar.style.transition = "width 0ms";
                bar.style.width = "0%";
                window.setTimeout(function () {
                    console.log(typeof ref._options.timeout, ref._options.timeout)
                    bar.style.transition = "width " + (ref._options.timeout * .95) + "ms linear";
                    bar.style.width = "100%";
                }, 10)
            }
        }
    }
    //
    //
    // INTIALIZE
    this.initialize = function () {

        //identify stage
        this._stage = document.querySelectorAll(this._options.stage)[0];
        this._stage.classList.add("carousel");
        //identify container
        this._container = this._stage.querySelectorAll(this._options.container)[0];
        this._container.classList.add("carousel__container")

        //identify slides
        this._stage.querySelectorAll(this._options.slides).forEach(function (item, i) {
            item.classList.add("carousel__slide")
            var item = {
                el: item,
                width: item.offsetWidth,
                height: item.offsetHeight
            }
            this._slides.push(item);
        }.bind(this));

        //loop
        if (this._options.loop) {
            const fragment = document.createDocumentFragment();
            var fauxPrepend = [];
            for (i = 0; i < this._getOption("perPage"); i++) {
                var reverse = this._slides.length - 1 - i;
                var slide = this._slides[reverse];
                var fauxSlide = slide.el.cloneNode(true);
                this._setAttributes(fauxSlide, {
                    "aria-hidden":"true"
                })
                fauxPrepend.push({
                    el: fauxSlide,
                    width: slide.width,
                    height: slide.height,
                    clone: slide
                })
                fragment.appendChild(fauxSlide);
            }
            this._slidesAll = fauxPrepend.concat(this._slides)
            this._container.insertBefore(fragment, this._container.children[0]);
            this._current = fauxPrepend.length;
        } else {
            this._slidesAll = this._slides;
        }

        //accessibility and aria roles
        this._setAttributes(this._stage, {
            "aria-roledescription": "carousel"
        });
        if (!this._stage.getAttribute('aria-label')) console.warn("Carousel should have aria-label describing contents", this._stage)
        this._slides.forEach(function (slide, i) {
            this._setAttributes(slide.el, {
                "role": "group",
                "aria-roledescription": "slide",
                "aria-label": (i + 1) + " of " + this._slides.length
            })
        }.bind(this))


        //progress
        this._progress = this._stage.querySelectorAll(this._options.progress)[0];
        if (this._progress) {
            this._progress.classList.add("carousel__progress");
        }

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
        this._setTransitionStyle();

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
                //TODO: progress bar on interaction is WIP
                if (this._progress) {
                    var bar = this._progress.children[0];
                    bar.removeAttribute('style')
                    bar.style.width = "100%";
                }
            }.bind(this))
        }

        if (this._options.swipe) {
            this._makeSwipable();
        }

        this._options.onInit(this);
    }
    //
    // HELPERS
    this._setTransitionStyle = function () {
        if (this._options.animation == "slide") {
            this._container.style.webkitTransition = "all " + this._options.duration + "ms " + this._options.easing;
            this._container.style.transition = "all " + this._options.duration + "ms " + this._options.easing;
        }
    }
    this._unsetTransitionStyle = function () {
        if (this._options.animation == "slide") {
            this._container.style.webkitTransition = "all 0ms ";
            this._container.style.transition = "all 0ms ";
        }
    }
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