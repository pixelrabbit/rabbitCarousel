function Rabbit(element, options) {

    this.options = Object.assign(Rabbit.defaults, options);

    this.stage = null;
    this.container = null;
    this.items = [];
    this._current = null;
    //
    // the main function for animating carousel
    this.to = function (i) {
        console.log("to",i);
        
        var offset = this.items[i].x * -1;
        this.container.style.transform = `translateX(${offset}px)`;
        this.container.style.webkitTransform  = `translateX(${offset}px)`;
        console.log(this.container)
    }
    // next and prev are shortcuts of to method
    this.prev = function () {
        this._current -= 1;
        this.to( this._current)
    }
    this.next = function () {
        this._current += 1;
        this.to(this._current)
    }
    //
    this.setStage();
    this.initialize();
}


//default options
Rabbit.defaults = {
    stage: ".carousel__stage",
    container: ".carousel__container",
    items: ".carousel__item",

    startIndex: 0,
    autoplay: false,
    circular: false,
    timeout: 6000,
    duration: 200,
    animation: "slide", //slide, fade, instant
    easing: "ease-out",

    perPage: false,
    pager: false //false or provide selector for container
}


Rabbit.prototype.setStage = function () {
    console.log("setStage");

    //identify stage
    this.stage = document.querySelectorAll(this.options.stage)[0];
    //identify container
    this.container = document.querySelectorAll(this.options.container)[0];
    //identify items
    this.items = this.stage.querySelectorAll(this.options.items);

    //transform items array to array of objects with data
    var itemsArr = []
    this.items.forEach(function (el, i) {
        var item = {
            el: el,
            width: el.offsetWidth,
            height: el.offsetHeight
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
Rabbit.prototype.initialize = function () {
    console.log("initialize", this.items)

    //set x coordinates
    this.items.forEach(function (item, i) {
        item.x = item.el.offsetLeft
    });

    //enable transition on container
    if(this.options.animation == "slide"){
        this.container.style.webkitTransition = `all ${this.options.duration}ms ${this.options.easing}`;
        this.container.style.transition = `all ${this.options.duration}ms ${this.options.easing}`;
    }
}









$(document).ready(function () {
    var carousel = new Rabbit();
    document.querySelector('.btn--prev').addEventListener('click', function () { carousel.prev() });
    document.querySelector('.btn--next').addEventListener('click', function () { carousel.next() });
});
