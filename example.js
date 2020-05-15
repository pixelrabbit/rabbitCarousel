/**
 * Name: csSliderousel
 * Description: Customizable slider class
 * Options:
 *   timeOut               : Length of time between transitions. Only truly useful if the carousel is autoplaying.
 *                           Accepts: integer (in milliseconds)
 *                           Default: 6000
 *
 *   defaultSlide          : Starting slide for carousel
 *                           Accepts: integer
 *                           Default: 0
 *
 *   speed                 : If there is a transition animation, this is how fast it will animate.
 *                           Accepts: integer (in milliseconds)
 *                           Default: 600
 *
 *   animation             : The transition animation to use for overlays
 *                           Accepts: 'fade', 'slide'
 *                           Default: 'slide'
 *
 *   easing                : The easing type to use for transitions, only for javascript animations
 *                           Accepts: string
 *                           Default: 'swing'
 *
 *   pager                 : Show the carousel pager
 *                           Accepts: boolean or string
 *                           Default: true
 *                           Use the following string to set the pager as a counter instead of bullets: %start% to %end% of %total%
 *
 *   nav                   : Show the carousel navigation (arrows)
 *                           Accepts: boolean
 *                           Default: true
 *
 *   autoPlay              : Autoplay carousel on page load
 *                           Accepts: boolean
 *                           Default: false
 *
 *   resumeAfterInteraction: Resume autoplay after the user has interacted with the carousel
 *                           Accepts: boolean
 *                           Default: false
 *                           Note: Not implemented
 *
 *   removeExcessSpacing   : On transition, remove any excess blank elements on the last slide
 *                           Accepts: boolean
 *                           Default: false
 *                           Note: Not implemented
 *
 *   timer                 : Show the carousel timer
 *                           Accepts: boolean
 *                           Default: false
 *
 *   circular              : Repeat carousel elements after last slide
 *                           Accepts: boolean
 *                           Default: false
 *
 *   circularMode          : Mode for circular wrapping
 *                           Accepts: 'infinite', 'fill', 'wrap'
 *                           Default: 'wrap'
 *                           Notes: Only wrap mode is implemented at this time
 *
 *   centerNav             : Auto-center the navigation elements
 *                           Accepts: boolean
 *                           Default: true
 *                           Notes: To center nav arrows, .nav-container must be a child of .bullet-container

 *   cssanimation          : Use CSS animation over javascript animation when available
 *                           Accepts: boolean
 *                           Default: true
 *
 *   extraRightMargin      : Add extra margin into the calculation for the carousel width
 *                           Accepts: integer
 *                           Default: 3
 *
 *   paddingCollapse       : Collapse the outer carousel padding when upCount = slideCount
 *                           Accepts: boolean
 *                           Default: true
 *
 *   cssTransition         : The CSS easing to use when CSS animation is enabled
 *                           Accepts: string
 *                           Default: cubic-bezier(0.39, 0.575, 0.565, 1)
 *
 *   slideContainer        : The slideContainer element to use
 *                           Accepts: string
 *                           Default: '.slide-container'
 *
 *   slideWrapper          : The slideWrapper element to use
 *                           Accepts: string
 *                           Default: '.cs-slider-wrapper'
 *
 *   bulletContainer       : The bulletContainer element to use
 *                           Accepts: string
 *                           Default: '.bullet-container'
 *
 *   navContainer          : The navContainer element to use
 *                           Accepts: string
 *                           Default: '.nav-container'
 *
 *   sliderMask            : The sliderMask element to use
 *                           Accepts: string
 *                           Default: .slider-mask'
 *
 *   slideClass            : The slide element to use
 *                           Accepts: string
 *                           Default: '.slide'
 *
 *   responsive            : Enabled resizing on window size change
 *                           Accepts: boolean
 *                           Default: false
 *
 *   responsiveMode        : Technique of resizing to use when responsive mode is enabled
 *                           Accepts: 'center' or ''
 *                           Default: ''
 *
 *   dragSlide:            : Enable touch sliding
 *                           Accepts: boolean
 *                           Default: false
 *
 *   slideCount            : The amount of carousel items to slide
 *                           Accepts: integer
 *                           Default: 3
 *                           Note: slideCount must be less than or equal to upCount
 *
 *   upCount               : The amount of carousel items to show
 *                           Accepts: integer
 *                           Default: 3
 *
 *   itemMargin            : The margin to use between carousel elements
 *                           Accepts: integer
 *                           Default: 15
 *
 *   itemWidth             : How the carousel determines itemWidth
 *                           Accepts: 'auto' or integer
 *                           Default: 'auto'
 *
 *   minItemWidth          : The minimum item width before reducing upCount in responsive mode
 *                           Accepts: integer
 *                           Default: 0
 *
 *   proportional          : Set slide height equal to width
 *                           Accepts: boolean
 *                           Default: true
 *
 *   onInitialized         : Callback for after the carousel is initialized
 *                           Accepts: function
 *                           Default: $.noop
 *
 *   onPlay                : Callback for the play event
 *                           Accepts: function
 *                           Default: $.noop
 *
 *   onPause               : Callback for the pause event
 *                           Accepts: function
 *                           Default: $.noop
 *
 *   onBeforeSlideChange   : Callback before the slide has changed
 *                           Accepts: function
 *                           Default: $.noop
 *                           Arguments: current slide, next slide
 *
 *   onAfterSlideChange    : Callback after the slide has changed
 *                           Accepts: function
 *                           Default: $.noop
 *                           Arguments: current slide, next slide
 *
 *   resetResize           : Resets carousel to slide zero when the size is changed
 *                           Accepts: boolean
 *                           Default: true
 *
 *   hoverPause            : Pauses autoplay when any element of the carousel is hovered (mouseover); autoplay resumes on mouseout. This was default behavior, adding option to disable
 *                           Accepts: boolean
 *                           Default: true
 *
 *   slideTabIndex         : Slides will have tabindex if set to true. This does not affect the tabindexing of navigation elements. Set this to false to disable tabindexing of slides.
 *                           Accepts: boolean
 *                           Default: true
 *
 *   slideLabels           : By default, slides include a visually hidden label that can be useful for debug purposes. Set this flag to false to disable.
 *                           Accepts: boolean
 *                           Default: true
 *
 *   navButtons           : By default, navigation dots are divs with tabindex 0. Setting this to true generates interactive buttons.
 *                           Accepts: boolean
 *                           Default: false
 *
 ============================================

 Relevant for timeline, Walters 08/2015:

 ============================================

 *   oneToOneIndicators    : Force one indicator per slide
 *                           Accepts: boolean
 *                           Default: false
 *
 *   labelCollection       : Add labels to bullet items
 *                           Accepts: string array
 *                           Default: undefined
 *
 *
 ============================================

 *
 * Triggers: Use triggers to hook into certain events to extend sliderousel
 *           by external modules or custom interactions
 *
 *   beforeInit
 *   afterInit
 *   beforeUpdate
 *   afterUpdate
 *
 * Exposed Events: Use triggers to call the following events
 *   play
 *   pause
 *   stop
 *   next
 *   prev
 *
 *
 * Todo:
 *   Have touchDelta keep track of horizontal and vertical points
 *   Test in IE9-10
 *   Fix last slider timer running twice
 *
 *
 * Valid Modes:
 *
 *   Responsive - Fixed Width, Center
 *   Responsive - Auto Width
 *
 *   Non-Responsive - Fixed Width
 *   Non-Responsive - Auto Width
 *
 */


function setMaxHeight(self){
	var maxHeight = 0;
	self.slides.each(function () { 
		if($(this).height() > maxHeight) maxHeight = $(this).height();
	});
	self.slideWrapper.css('height',maxHeight+'px')
  }

(function ($, document, window) {
	'use strict';
  
	var csSliderousel = {
	  /**
	   * [init description]
	   * @param  {jQuery selector} element The slider element
	   * @param  {object} options An object literal of options to merge with the defaults
	   */
	  init: function (element, options) {
		var self = this;
		//Quick reference to the element
		self.el = $(element);
		//self.element = element;
		self.opt = $.extend({}, $.fn['csSliderousel']._defaults, options);
  
		//Set some private data
		self._paused = !self.opt['autoPlay'];
		self._slideIndex = 0;
		self._slideWidth = '';
		self._carouselIndex = 0;
		self._hoverPaused = false;
		self._isCssAnimation = false;
		self._trueItemWidth = 0;
		self._trueUpCount = self.opt['upCount'];
		self._trueSlideCount = self.opt['slideCount'];
		self._interacted = false;
		self._browser = '';
		self._visibleIndex = [];
  
		//timing = 0;
		//percent = 0;
		//pauseTime = 0;
		//isDragging = false;
		//dragDelta = self.opt['speed'];
		//friction = 0.35;
  
		self.el.data(this._name, this);
		self._name = 'csSliderousel';
		self.el.attr('data-id', 'csSliderousel_' + (++uidCounter));

		$(self.el).parent().attr({
			'role':'region',
			'aria-label': $(self.el).attr('data-carousellabel') + ", carousel"
		})
  
		//Add the extra element variables to the slider
		self.slideContainer = self.el.find(self.opt['slideContainer']);
		// self.bulletContainer = self.el.find(self.opt['bulletContainer']);  Dan - no reason to limit pager
		self.bulletContainer = $(self.opt['bulletContainer']);
		self.navContainer = self.el.find(self.opt['navContainer']);
		self.slides = self.el.find(self.opt['slideClass']);
  
		//Set the initial active slide
		self.el.addClass('cs-slider no-touch');
  
		//Set up a reference to the helpers/timing class
		self.helpers = this.helpers();
		self.timing = this.timing();
  
		//Load any extra modules
		$.each($.fn['csSliderousel']['modules'], function (helper, opts) {
		  if (helper !== 'uid') {
			opts.call(self);
		  }
		});
  
		self.el.trigger('beforeInit');
  
		self._registerOptions(true);
		self._registerEvents();
  
		self.el.trigger('afterInit');
		self.opt['onInitialized'].call(self);
  
		if (self.opt['autoPlay']) {
		  self.play();
		}
  
		//Set to the first element for some initial calculations
		//self.goToSlide(0, true);
		self.goToSlide(self.opt['defaultSlide'], true);
  
		return self;
	  },
  
	  /**
	   * Start the slider
	   */
	  play: function () {
		this.timing._startTimer();
		this.opt['onPlay'].call(this);
	  },
  
	  /**
	   * Toggle the play state of the slider
	   */
	  pause: function () {
		if (!this._paused) {
		  this.timing._pauseTimer();
		} else {
		  this.timing._startTimer();
		}
  
		this.opt['onPause'].call(this);
	  },
  
	  /**
	   * Stop playback of the slider
	   */
	  stop: function () {
		this.timing._pauseTimer();
	  },
  
	  /**
	   * Go to the next slide
	   */
	  next: function () {
  
		this.goToSlide(this._slideIndex + this._trueSlideCount);
	  },
  
	  /**
	   * Go to the previous slide
	   */
	  previous: function () {
		this.goToSlide(this._slideIndex - this._trueSlideCount);
	  },
  
	  /**
	   * Go to a specific slide
	   * @param  {integer} index The 0-based index of the slide to transition to
	   */
	  goToSlide: function (index, nofocus) {
		var self = this;
  
		if (this.slides.is(':animated')) { return; }
  
		var max = this.helpers.getMaxTransitions() - 1,
		  carouselIndex = index / this._trueSlideCount;
  
		if (carouselIndex > max && !this.opt['circular']) {
		  if (!this._paused) {
			this.pause();
		  }
  
		  //console.log(max);
  
		  index = max * this._trueSlideCount;
		  this._dragDelta = this.opt['speed'];
		  //return; //need to remove this with touch events
		} else if (carouselIndex > max && this.opt['circular']) {
		  index = carouselIndex = 0;
		} else if (carouselIndex < 0 && !this.opt['circular']) {
		  if (!this._paused) {
			this.pause();
		  }
  
		  index = carouselIndex = 0;
		  this._dragDelta = this.opt['speed'];
		  //return; //need to remove this with touch events
		} else if (carouselIndex < 0 && this.opt['circular']) {
		  index = max;
		} else if (carouselIndex >= 0 && carouselIndex <= max) {
		  //animate to that slide
		} else {
		  return;
		}
  
		if (this._slideIndex !== index) {
		  this.opt['onBeforeSlideChange'].call(this, this.slides.eq(this._slideIndex), this.slides.eq(index)); //send the current and next slide
		}
  
		//Animate the slide
		this._animateSlide(this._slideIndex, index);
  
		if (this._slideIndex !== index) {
		  this.opt['onAfterSlideChange'].call(this, this.slides.eq(this._slideIndex), this.slides.eq(index)); //send the current and next slide
		}
  
  
		this._slideIndex = index;
  
		if (self.opt['slideTabIndex']) {
		  //Update the tab indexes
		  if (this.sliderMask) this.sliderMask.find('a').attr('tabindex', -1);  //09272016 - govea
		  this.slides.attr('tabindex', -1).removeClass('cs-visible');
  
		  //Do not allow manual focus on a partial element, but do allow the hover state to work
		  if (this.opt['responsiveMode'] === 'partials') {
			this._visibleIndex = [index, carouselIndex * this._trueSlideCount + this._trueSlideCount + 1];
			this.slides.slice(this._visibleIndex[0], this._visibleIndex[1] - 1).attr('tabindex', -1);
			this.slides.slice(this._visibleIndex[0], this._visibleIndex[1]).addClass('cs-visible');
			this.slides.slice(this._visibleIndex[0], this._visibleIndex[1] - 1).find('*').andSelf().filter('a').removeAttr('tabindex');
		  } else {
			this._visibleIndex = [index, carouselIndex * this._trueSlideCount + this._trueSlideCount];
			this.slides.slice(this._visibleIndex[0], this._visibleIndex[1]).attr('tabindex', -1).addClass('cs-visible');
			this.slides.slice(this._visibleIndex[0], this._visibleIndex[1]).find('*').andSelf().filter('a').removeAttr('tabindex');
		  }
		}
  
  
		//update active pager
		if (this.opt['pager']) {
		  if (typeof this.opt['pager'] === 'string') {
			this.bulletContainer.text(self.helpers.parsePagerString(self.opt['pager']));
		  } else if (typeof this.opt['pager'] === 'object') {
			if (this._visibleIndex[0] + 1 === this._visibleIndex[1]) {
			  this.bulletContainer.html(self.helpers.parsePagerString(self.opt['pager']['single']));
			} else {
			  this.bulletContainer.html(self.helpers.parsePagerString(self.opt['pager']['multiple']));
			}
		  } else {
			this.bulletContainer.children().removeClass('selected').attr('aria-disabled','false').eq(index / this._trueSlideCount).addClass('selected').attr('aria-disabled','true');    
		  }
		}
  
		if (max === 1 || !this.helpers.isLastSlide(carouselIndex) && !this.helpers.isLastSlide(carouselIndex)) {
		  this.navContainer.children().removeClass('disabled');
		  this.el.removeClass('first-slide last-slide');
		}
  
		if (this.helpers.isFirstSlide(carouselIndex)) {
		  this.navContainer.find('.arrow-left').addClass('disabled');
		  this.el.addClass('first-slide');
		}
  
		if (this.helpers.isLastSlide(carouselIndex) && !this.opt['circular']) {
		  this.navContainer.find('.arrow-right').addClass('disabled');
		  this.el.addClass('last-slide');
		}
  
		//Need to move this to end of animation queue
		if (self.opt['slideContainerFocus']) { //12-11-18 TLS wrapped this to change slide container focus for accessibility
		  if (this._interacted && !nofocus) {
			  this.slideContainer.focus();
		  }
	  }
  
		//If not paused, restart the timer
		if (this._paused && !this._hoverPaused) {
		  this.timing._restartTimer(true);
		} else {
		  this.timing._restartTimer();
		}
	  },
	  /**
	   * Register the slider options and create the needed elements
	   * @param  {boolean} initial Is this an initial run or are we updating the slider after a resize event
	   */
	  _registerOptions: function (initial) {
		var self = this;
  
		// Make sure that the slide count is never higher than the up count
		if (self.opt['slideCount'] > self.opt['upCount']) {
		  self.opt['slideCount'] = self._trueSlideCount = self.opt['upCount'];
		}
  
		if (initial) {
		  if (self.opt['slideTabIndex']) {
			self.slideContainer.attr('tabindex', -1);
		  }
  
		  self.el.children().wrapAll($('<div />').attr('class', 'cs-slider-wrapper').css('position', 'relative'));
		  self.slideWrapper = self.el.find(self.opt['slideWrapper']);
  
		  self.slides.eq(0).addClass('first');
		  self.slides.eq(-1).addClass('last');
  
		  //If we're responsive, do an initial check to change the up and slide counts
		  if (self.opt['responsive']) {
			if (self.opt['slideCount'] > self._trueUpCount) {
			  self._trueSlideCount = self._trueUpCount;
			}
		  }
  
		  //Setup circular empty elements
		  if (self.opt['circular'] && (self.opt['circularMode'] === 'infinite' || self.opt['circularMode'] === 'fill')) {
			var carouselRemainder = self.slides.length % self._trueSlideCount;
			if (carouselRemainder !== 0) {
			  for (var i = 0; i < carouselRemainder; i++) {
				self.slideContainer.append(
				  self.slides.eq(i).clone().addClass('clone').removeClass('first last active'));
			  }
			}
  
			//Update cached slides object
			self.helpers.getSlides();
		  }
  
		  
		  self.slides.each(function (index) {
			//Store the original width and height to do calculations for responsiveness
			// $(this).find('img').each(function () {
			$(this).each(function () { 
			  $(this).attr({
				'data-sw': $(this).outerWidth(true),
				'data-sh': $(this).height() 
			  }); 

			  $(this).attr({
				  'role':'group'
			  })
			});


			if (self.opt['slideLabels']) {
			  $(this).prepend($('<span>', { 'class': 'visually-hidden' }).text('Slide ' + (index + 1)));
			}
		  });


		  setMaxHeight(self);
		  
  
		  //Set up the element for animation
		  if (self.opt['animation'].indexOf('slide') > -1) {
			self.slideContainer.css({
			  'display': 'block',
			  'overflow': 'hidden'
			});
  
			//Set up the horizontal slider
			if (self.opt['animation'] === 'slideHorizontal' || self.opt['animation'] === 'slide') {
			  self.slides.css({
				'float': 'left',
				'position': 'relative',
				'display': 'block'
			  });
  
			  //create slider mask only if it does not yet exist
			  if ($(self.opt["sliderMask"]).length < 1) {
				self.slides.wrapAll($('<div />').attr('class', 'slider-mask'));
			  }
			  // set a reference to sliderMask
			  self.sliderMask = self.el.find(self.opt['sliderMask']);
			  //apply styling to sliderMask
			  $(self.sliderMask).css({
				'height': self.slides.eq(0).outerHeight(true) + 'px',
				'display': 'block',
				'position': 'absolute'
			  });
  
			}
		  }
  
		  self._setupAnimationOptions();
		  self._updateSlider(initial);
		  self._setupOptionalElements(initial);
		} else {
		  self._updateSlider();
		}
	  },
  
	  /**
	   * Register the necessary events for the slider
	   */
	  _registerEvents: function () {
		var self = this;
  
		//Interaction Events
		if (self.opt['hoverPause']) {
		  self.el.on('mouseover.csSliderousel', function (e) {
			if (!self._paused) {
			  self._hoverPaused = true;
			  self.pause();
			}
  
			if ($(e.target).parents('.slide').index() > -1) {
			  self.slides.removeClass('cs-hover');
			  self.slides.eq($(e.target).parents('.slide').index()).addClass('cs-hover');
			}
		  });
  
		  self.el.on('mouseout.csSliderousel', function () {
			//If we're paused and it's because of a hover, then unpause the slider
			if (self._paused && self._hoverPaused) {
			  self.pause();
			  self._hoverPaused = false;
			}
		  });
		}
  
		self.el.on('keyup.csSliderousel', function (e) {
		  var keyArray = [37, 38, 39, 40];
  
		  if ($.inArray(e.which, keyArray)) {
			self._interacted = true;
		  }
  
		  //Go to the next or previous slide, based on the left and right arrow keys
		  if (e.which === keyArray[0] || e.which === keyArray[1]) {
			self.previous();
		  }
  
		  if (e.which === keyArray[2] || e.which === keyArray[3]) {
			self.next();
		  }
		});
  
		//Custom events to allow for external control
		self.el.on('play', $.proxy(self.play, self));
		self.el.on('pause', $.proxy(self.pause, self));
		self.el.on('next', $.proxy(self.next, self));
		self.el.on('previous', $.proxy(self.previous, self));
		self.el.on('stop', $.proxy(self.stop, self));
	  },
  
	  /**
	   * Return the animation type - CSS3 or Position-based
	   */
	  _setupAnimationOptions: function () {
		var self = this;
		//Use CSS3 animation, this is only if someone manually sets it to false
		if (self.opt['cssanimation']) {
		  self.slideContainer.addClass('css3-animation');
		}
  
		//Add the animation type as a class
		if (self.opt['animation'] !== '') {
		  self.slideContainer.addClass('transition-' + self.opt['animation']);
		}
  
		self._isCssAnimation = self.helpers.isCssAnimation();
  
		if (self.opt['animation'] !== 'fade') {
		  if (self._isCssAnimation) {
			self.slides.css(self.helpers.getVendorPrefix('transition'), self.helpers.getVendorPrefix('transform') + ' ' + self.opt['speed'] + 'ms ' + self.opt['cssTransition']);
			self.slides.css(self.helpers.getVendorPrefix('transform'), 'translate3d(0, 0, 0)');
		  } else {
			self.sliderMask.css('left', 0);
		  }
		}
	  },
  
	  /**
	   * Setup any optional elements that were requested (arrow-navigation, bullets, timer)
	   */
	  _setupOptionalElements: function (initial) {
		var self = this;
  
		if (initial) {
		  //Set up pager if it exists
		  if (self.opt['pager']) {
  
			if (typeof self.opt['pager'] === 'string' || typeof self.opt['pager'] === 'object') {
			  self.el.addClass('text-pager');
			} else {
			  self.el.addClass('graphic-pager');
			  self.bulletContainer.on('click.csSliderousel keyup.csSliderousel', '.nav-item', function (e) {
				e.preventDefault();
  
				if (e.type === 'click' || (e.type === 'keyup' && e.which === 13)) {
				  self._interacted = true;
  
				  if (self._slideIndex !== $(this).index() * self._trueSlideCount) {
					self._hoverPaused = false;
					self.stop();
  
					self.goToSlide($(this).index() * self._trueSlideCount);
				  }
				}
			  });
			}
  
			//Don't allow text selection
			self.bulletContainer.disableSelection();
			self.el.disableSelection();
		  }
  
		  if (self.opt['nav']) {
			self.navContainer.append($('<button />', {
			  'class': 'nav-arrow arrow-left disabled',
			  'tabindex': 0,
			  'title': 'Previous Set of Slides',
			  'role': 'button',
			  'aria-hidden': 'true'
			})
			  .html($('<span />', { 'class': 'visually-hidden' }).text('Previous Set of Slides')));
  
			self.navContainer.append($('<button />', {
			  'class': 'nav-arrow arrow-right',
			  'tabindex': 0,
			  'title': 'Next Set of Slides',
			  'role': 'button',
			  'aria-hidden': 'true'
			})
			  .html($('<span />', { 'class': 'visually-hidden' }).text('Next Set of Slides')));
  
  
  
			self.navContainer.on('click.csSliderousel keyup.csSliderousel ', '.nav-arrow', function (e) {
			  e.preventDefault();
  
			  if (e.type === 'click' || (e.type === 'keyup' && e.which === 13)) {
				self._hoverPaused = false;
				self._interacted = true;
  
				if (!$(this).hasClass('disabled')) {
				  if ($(this).hasClass('arrow-left')) {
					self.stop();
					self.previous();
				  } else {
					self.stop();
					self.next();
				  }
				}
			  }
			});
		  }
  
		  if (self.opt['timer']) {
			self.el.append($('<div />', { 'class': 'slider-timer' }).append('<span />'));
			self.timerContainer = self.el.find('.slider-timer');
		  }
  
		  self._updateOptionalElements(true);
		}
	  },
  
	  /**
	   * Update the optional elements
	   * @param  {boolean} upCountUpdated Was the upCount updated?
	   */
	  _updateOptionalElements: function (upCountUpdated) {
		var self = this,
		  maxTrans,
		  appendString = '<span />';
		if (self.opt['pager']) {
		  if (typeof self.opt['pager'] === 'string' || typeof self.opt['pager'] === 'object') {
  
		  } else {
  
			if (upCountUpdated) {
  
			  //console.log(self.slides)
  
			  maxTrans = self.opt['oneToOneIndicators'] ? self.helpers.getSlides().length : self.helpers.getMaxTransitions();
  
			  self.bulletContainer.find('.nav-item').remove();
  
			  var homeCaptionText = $(".caption");
			  for (var x = 0; x < maxTrans; x++) {
				if (self.bulletContainer.find(self.navContainer).length) {
				  self.navContainer.before($('<button />', { 'class': 'nav-item bullet' }).append($(appendString)/*.text(x + 1)*/));
				} else {
				  if (self.opt['labelCollection']) {
					appendString = '<span class="bull-label">' + self.opt['labelCollection'][x] + '</span>';
				  }
				  self.bulletContainer.append($('<button />', { 'class': 'nav-item bullet' }).append($(appendString)/*.text(x + 1)*/));
				}
			  }
			}
			self.bulletContainer.children().eq(0).addClass('selected').attr('aria-disabled','true');
  
  
		  }
  
		  //Calcluate the center for the navigation elements
		  if (self.opt['centerNav']) {
			//remove border width from the calculation
			self.bulletContainer.css('left', (self.bulletContainer.parent().outerWidth(false) / 2) - (self.bulletContainer.width() / 2));
		  }
		}
  
  
		if (this.opt['autoHideNav']) {
		  if (self.slides.length <= self._trueUpCount) {
			self.navContainer.hide();
			self.bulletContainer.hide();
		  } else {
			self.navContainer.show();
			self.bulletContainer.show();
		  }
		}
	  },
	  /**
	   * Animate to the requested slides
	   * @param  {integer} current The current slide
	   * @param  {integer} next    The next slide to transition to
	   */
	  _animateSlide: function (current, next) {
		//update animation
		current = this.slides.eq(current);
		next = this.slides.eq(next);
  
		// Added select class, Walters 8/19/15
		this.slides.removeClass('selected');
		next.addClass('selected');
  
  
		if (this.opt['animation'] === 'fade' && current[0] !== next[0]) {
  
		  this.slides.css({
			'z-index': 'auto',
			'position': 'absolute'
		  }).removeClass('active');
		  next.fadeIn(this.opt['speed'], function () {
			current.hide();
		  }).css('z-index', this.slides.length).addClass('active');
		  this.bulletContainer.css('z-index', this.slides.length + 1); //zindex over images if placed within container
  
		  //optimize this
		} else if (this.opt['animation'] === 'slide') {
		  /*
			//Only slide to the last element, leave no free space
			if(this.slides.index(next) + this.opt['upCount'] > this.slides.length && this.opt['upCount'] > 1) {
			next = this.slides.eq((this.slides.length) - this.opt['upCount']);
		  }*/
  
		  if (this._isCssAnimation) {
			this.slides.css(this.helpers.getVendorPrefix('transition-duration'), this._dragDelta + 'ms ');
			this.slides.css(this.helpers.getVendorPrefix('transform'), 'translate3d(-' + (this.slides.index(next) * this.slides.eq(0).outerWidth(true)) + 'px, 0, 0)');
		  } else {
			this.sliderMask.animate({
			  left: '-' + (this.slides.index(next) * this.slides.eq(0).outerWidth(true))
			}, this._dragDelta, this.opt['easing']);
		  }
		}
	  },
  
	  /**
	   * Update the slider
	   * @param  {boolean} initial Is this an initial run or and update after a resize event?
	   */
	  _updateSlider: function (initial) {
		console.log("_updateSlider")
		//This is some pretty dirty logic here. It really needs to be cleaned up
		var self = this,
		  spacePerItem,
		  visualUpCount,
		  trueWidth,
		  tempUpCount,
		  maxItemsWidth,
		  newWidth,
		  slideWidth = self.helpers.getTrueItemWidth(0),
		  extraWidth = self.helpers.getExtraWidth(),
		  extraContainerWidth = self.helpers.getExtraContainerWidth(),
		  proportionalHeight = slideWidth,
		  containerHeight,
		  old = self._slideIndex;
  
		self.el.trigger('beforeUpdate');
  
  
		//better height calculation -rob
		if (self.opt['proportional']) {
		  containerHeight = self.helpers.itemWidth() + self.opt['extraRightMargin'];
		} else {
		  var max = 0;
		  self.slides.each(function () {
			if ($(this).outerHeight(false) > max) max = $(this).outerHeight(false);
		  });
		  containerHeight = max;
		}

		setMaxHeight(self);
  
		if (initial || self.opt['itemWidth'] === 'auto') {
		  self.slideWrapper.css('padding-right', parseInt(self.slideWrapper.css('padding-left'), 10));
  
		  //Set the width and margin of each element
		  self.slides.each(function () {
			$(this).css({
			  'width': slideWidth,
			  'margin-right': self.opt['itemMargin']
			});
		  });
  
		  if (self.opt['proportional']) {
			self.slides.css('height', proportionalHeight);
		  }
		}
  
		if (self.opt['responsive']) {
		  //Get the actual width of the slider
		  trueWidth = self.el.outerWidth(false) - extraWidth + self.opt['itemMargin'] + self.opt['extraRightMargin'];
		  spacePerItem = self.helpers.spacePerItem(true);
  
		  tempUpCount = Math.floor(trueWidth / spacePerItem);
  
		  if (self.opt['responsiveMode'] === 'partials') {
			visualUpCount = Math.ceil(trueWidth / spacePerItem);
			visualUpCount = (visualUpCount <= 0) ? 1 : ((visualUpCount < self.opt['upCount']) ? visualUpCount : self.opt['upCount']);
		  }
  
		  tempUpCount = (tempUpCount <= 0) ? 1 : ((tempUpCount < self.opt['upCount']) ? tempUpCount : self.opt['upCount']);
  
		  //Only update the slider elements if there was a change in upcount
		  if (tempUpCount !== self._trueUpCount || self.opt['itemWidth'] === 'auto' || initial) {
			self._trueUpCount = tempUpCount;
  
			if (self.opt['paddingCollapse']) {
			  if (self.slides.length === self._trueUpCount) {
				self.slideWrapper.data('padding-left', self.slideWrapper.css('padding-left'));
				self.slideWrapper.data('padding-right', self.slideWrapper.css('padding-right'));
				self.slideWrapper.css({
				  'padding-left': 0,
				  'padding-right': 0
				});
			  } else if (self.slideWrapper.data('padding-left')) {
				self.slideWrapper.css({
				  'padding-left': self.slideWrapper.data('padding-left'),
				  'padding-right': self.slideWrapper.data('padding-right')
				});
				//self.slideWrapper.removeData('padding-left');
				//self.slideWrapper.removeData('padding-right');
			  }
			  extraWidth = self.helpers.getExtraWidth();
			}
  
			//Update the slideCount
			if (self.opt['slideCount'] > self._trueUpCount || (self._trueUpCount <= self.opt['slideCount'])) {
			  self._trueSlideCount = self._trueUpCount;
			}
  
  
  
			if (self.opt['resetResize']) {
			  
  
			  //Reset the carousel position on any update
			  self.goToSlide(0, true);
  
			  //Set the slider mask width and height
			  if (self.opt['animation'] === 'slide') {
				self.sliderMask.css({
				  'height': containerHeight,
				  'width': self.helpers.getTotalSlideLength()
				});
			  }
  
			  //Set the min and max width to keep from seeing partial slides while resizing
			  if (self.opt['itemWidth'] !== 'auto') {
				//Remove min/max-width for partial element support - Mobile Web
  
				if (self.opt['responsiveMode'] === 'partials') {
				  self.slideWrapper.css({
					'max-width': spacePerItem * visualUpCount + extraContainerWidth - self.opt['itemMargin']
				  });
				} else {
				  self.slideWrapper.css({
					'max-width': spacePerItem * self._trueUpCount + extraContainerWidth - self.opt['itemMargin'],
					'min-width': spacePerItem * self._trueUpCount + extraContainerWidth - self.opt['itemMargin']
				  });
				}
			  }
  
			  //Need to have a partial upcount variable as well
			  if ((trueWidth / spacePerItem) % 1 !== 0 && self.opt['responsiveMode'] === 'partials') {
				//self._trueSlideCount -= 1;
				//self._trueUpCount -= 1;
			  }
  
			  if (self.opt['resetResize']) self._updateOptionalElements(true);
			} else {
			  if (self.opt['resetResize']) self._updateOptionalElements(false);
			}
  
			if (self.opt['itemWidth'] !== 'auto') {
			  maxItemsWidth = spacePerItem * self._trueUpCount;
			  newWidth = self.el.parent().width() - maxItemsWidth;
  
			  if (self.opt['responsiveCenter']) {
				if (self.opt['responsiveMode'] === 'partials') {
				  //TODO: Update to allow for centering with partials support
				  if (self._trueUpCount === self._trueSlideCount) {
					//only pad when all elements are visible
					//self.el.css({
					//  'padding-left': (self.el.parent().width() - self.slideWrapper.width()) / 2 - (extraWidth / 2),
					//  'padding-right': (self.el.parent().width() - self.slideWrapper.width()) / 2 - (extraWidth / 2)
					//});
				  }
				} else {
				  self.el.css({
					'padding-left': newWidth / 2 - (extraWidth / 2),
					'padding-right': newWidth / 2 - (extraWidth / 2)
				  });
				}
			  }
			}
  
			//Find a better way to do this
			if (initial && self.opt['itemWidth'] === 'auto') {
			  self._updateSlider();
			}
		  } else {
			//Set the slider mask width and height
			if (self.opt['animation'] === 'slide') {
			  self.sliderMask.css({
				'height': containerHeight,
				'width': self.helpers.getTotalSlideLength()
			  });
			}
  
			//Set the min and max width to keep from seeing partial slides while resizing
			if ($(window).innerWidth() === self.el.width()) {
			  self.el.css('width', 'auto');
			  self.slideWrapper.css({
				'max-width': self.helpers.spacePerItem() * self._trueUpCount + extraContainerWidth - self.opt['itemMargin'],
				'min-width': slideWidth * self._trueUpCount + extraContainerWidth - self.opt['itemMargin']
			  });
			}
			if (self.opt['resetResize']) {
			  //Setup bullets, nav arrows and timer
			  self._updateOptionalElements(false);
			}
		  }
  
		  // self.slideContainer.css('height', containerHeight);
		  self.slideContainer.css('height', self.sliderMask.outerHeight(false));
  
		  //Fixes webkit paint bug
		  self.helpers.forceWebkitRepaint();
		  self.el.trigger('afterUpdate');
  
		}
		  /* self.goToSlide(old,true); :(  */
		
	  },
  
	  /**
	   * All timing functions for the slider
	   * Defined as an external module for code reduction
	   */
	  timing: function () {
		return {
		  _startTimer: $.noop,
		  _restartTimer: $.noop,
		  _stopTimer: $.noop,
		  _pauseTimer: $.noop,
		  _updateTime: $.noop,
		  _getAnimationFrame: $.noop
		};
	  },
	  helpers: function () {
		var self = this;
		return {
		  forceWebkitRepaint: function () {
			if (self._browser === 'webkit') {
			  self.slideWrapper.hide();
			  self.slideWrapper.get(0).offsetHeight; // no need to store this anywhere, the reference is enough
			  self.slideWrapper.show();
			}
		  },
		  /**
		   * Check of we're using CSS3 animations
		   * @return {Boolean} [description]
		   */
		  isCssAnimation: function () {
			//return self.opt['cssanimation'] && (!(typeof window.Modernizr === 'undefined') && Modernizr.csstransforms);
			//Mimic modernizr
			return self.opt['cssanimation'] && (function () {
			  var b = document.body || document.documentElement,
				s = b.style,
				p = 'transition',
				v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'];
  
			  if (typeof s[p] === 'string') {
				return true;
			  }
			  p = p.charAt(0).toUpperCase() + p.substr(1);
  
			  for (var i = 0; i < v.length; i++) {
				if (typeof s[v[i] + p] === 'string') {
				  return true;
				}
			  }
			  return false;
			}());
		  },
		  isFirstSlide: function (index) {
			return index <= 0;
		  },
		  isLastSlide: function (index) {
			return index >= this.getMaxTransitions() - 1;
		  },
		  /**
		   * Get a device agnostic X event coordinate
		   * @param  {[type]} e [description]
		   * @return {[type]}   [description]
		   */
		  getX: function (e) {
			return e.clientX || e.originalEvent.changedTouches[0].pageX;
		  },
		  /**
		   * Get a device agnostic Y event coordinate
		   * @param  {[type]} e [description]
		   * @return {[type]}   [description]
		   */
		  getY: function (e) {
			return e.clientY || e.originalEvent.changedTouches[0].pageY;
		  },
		  /**
		   * Get device agnostic event coordinates
		   * @param  {[type]} e [description]
		   * @return {[type]}   [description]
		   */
		  getCoords: function (e) {
			return {
			  x: self.helpers.getX(e),
			  y: self.helpers.getY(e)
			};
		  },
		  /**
		   * Return the correct vendor prefix for the specified property
		   * @param  {string} property A CSS3 property
		   * @return {string}          A CSS3 property with the correct vendor prefix
		   */
		  getVendorPrefix: function (property) {
			if (self._browser !== '') {
			  return '-' + self._browser + '-' + property;
			}
  
			if (!window.getComputedStyle) {
			  return property;
			}
  
			var styles = window.getComputedStyle(document.documentElement, ''),
			  pre = (Array.prototype.slice
				.call(styles)
				.join('')
				.match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
			  )[1];
  
			self._browser = pre;
			return '-' + pre + '-' + property;
		  },
		  /**
		   * [getSlides description]
		   * @return {[type]} [description]
		   */
		  getSlides: function () {
			self.slides = self.slideContainer.find(self.opt['slideClass']);
			return self.slides;
		  },
		  /**
		   * [getTotalSlideLength description]
		   * @return {[type]} [description]
		   */
		  getTotalSlideLength: function () {
			var total = 0;
			self.slides.each(function () {
			  total += $(this).outerWidth(true);
			});
  
			return total;
		  },
		  /**
		   * [getMaxTransitions description]
		   * @return {[type]} [description]
		   */
		  getMaxTransitions: function () {
			if (self.opt['cicular'] && self.opt['circularMode'] === 'infinite') {
			  return Math.ceil((self.slides.length - self._trueUpCount) / self._trueSlideCount) + 1;
			}
			else if (self.opt['oneToOneIndicators']) {
			  return self.slides.length + 1;
			}
			else {
			  //rob c 04-24-2017 minimum return 1
			  return Math.max(Math.ceil((self.slides.length - self._trueUpCount) / self._trueSlideCount) + 1, 1);
			}
		  },
		  /**
		   * [getTrueItemWidth description]
		   * @param  {[type]} index [description]
		   * @return {[type]}       [description]
		   */
		  getTrueItemWidth: function (index) {
			if (self.opt['extraRightMargin'] > 0 && index === self.slides.length - 1) {
			  return self.helpers.itemWidth() - (self.slides.eq(index).outerWidth(false) - self.slides.eq(index).width()) + self.opt['extraRightMargin'];
			} else {
			  return self.helpers.itemWidth() - (self.slides.eq(index).outerWidth(false) - self.slides.eq(index).width());
			}
		  },
		  /**
		   * [getExtraWidth description]
		   * @return {[type]} [description]
		   */
		  getExtraWidth: function () {
			return (self.slideWrapper.outerWidth(true) - self.slideWrapper.width()) + (self.slideContainer.outerWidth(true) - self.slideContainer.width()) + self.opt['extraRightMargin'];
		  },
		  /**
		   * [getExtraContainerWidth description]
		   * @return {[type]} [description]
		   */
		  getExtraContainerWidth: function () {
			return (self.slideContainer.outerWidth(true) - self.slideContainer.width()) + self.opt['extraRightMargin'];
		  },
		  /**
		   * [availableWidth description]
		   * @return {[type]} [description]
		   */
		  availableWidth: function () {
			if (self.opt['itemWidth'] === 'auto' || self.opt['itemWidth'] === 'manual') {
			  return self.el.outerWidth(false) - self.helpers.getExtraWidth() + self.opt['itemMargin'];
			} else {
			  return parseInt(self.opt['itemWidth'], 10) + self.opt['itemMargin'];
			}
		  },
		  /**
		   * [spacePerItem description]
		   * @return {[type]} [description]
		   */
		  spacePerItem: function (update) {
			if (self.opt['itemWidth'] !== 'auto') {
			  return this.availableWidth();
			} else {
			  var tempUpCount = self._trueUpCount,
				availableWidth = this.availableWidth(),
				tempSpace = availableWidth / self._trueUpCount;
  
			  if (self.opt['minItemWidth'] > 0) {
				//calculate how many can fit here?
				tempUpCount = Math.floor(availableWidth / (self.opt['minItemWidth'] + self.opt['itemMargin']));
				tempSpace = availableWidth / tempUpCount;
  
				if (tempUpCount <= self.opt['upCount']) {
				  if (self.opt['minItemWidth'] > tempSpace) {
					tempUpCount = tempUpCount > 1 ? tempUpCount - 1 : 1;
				  }
				} else {
				  tempUpCount = self.opt['upCount'];
				}
			  }
  
			  //Do we have partial pixels for the width
			  if (availableWidth % tempUpCount >= 1 && update) {
				//Add the excess padding to the slideWrapper
				self.slideWrapper.css('padding-right', parseInt(self.slideWrapper.css('padding-right'), 10) + availableWidth % tempUpCount);
			  }
  
			  return Math.floor(availableWidth / tempUpCount);
			}
		  },
		  /**
		   * [itemWidth description]
		   * @return {[type]} [description]
		   */
		  itemWidth: function () {
			return Math.floor(this.spacePerItem()) - self.opt['itemMargin'];
		  },
		  /**
		   * [paddingRemainder description]
		   * @return {[type]} [description]
		   */
		  paddingRemainder: function () {
			return (this.spacePerItem() - (this.itemWidth() + self.opt['itemMargin'])) * 4;
		  },
		  /**
		   * [carouselPadding description]
		   * @return {[type]} [description]
		   */
		  carouselPadding: function () {
			return [
			  parseInt(self.el.css('padding-top'), 10),
			  parseInt(self.el.css('padding-right'), 10) + Math.floor((this.paddingRemainder()) / 2) + this.paddingRemainder() % 2,
			  parseInt(self.el.css('padding-bottom'), 10),
			  parseInt(self.el.css('padding-left'), 10) + Math.floor(this.paddingRemainder() / 2)
			];
		  },
		  /**
		   * [getResponsivePadding description]
		   * @return {[type]} [description]
		   */
		  getResponsivePadding: function () {
			return self._trueUpCount * this.getTrueItemWidth(0);
		  },
		  parsePagerString: function (pager) {
			var pagerString = pager.replace(/%start%|%end%|%total%/g, function (w) {
			  switch (w) {
				case '%start%':
				  return self._visibleIndex[0] + 1;
				case '%end%':
				  return self._visibleIndex[1] > self.slides.length ? self.slides.length : self._visibleIndex[1];
				case '%total%':
				  return self.slides.length;
			  }
			});
  
			return pagerString;
		  }
		};
	  }
	}, uidCounter = 0;
  
	/**
	 * Add support for csSliderousel plugin to jQuery
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	$.fn['csSliderousel'] = function (options) {
	  if (options === undefined || typeof options === 'object') {
		return this.each(function () {
		  if ($.data(this, 'csSliderousel')) {
			$.data(this, 'csSliderousel').init(this, options);
		  } else {
			$.data(this, 'csSliderousel', Object.create(csSliderousel).init(this, options));
		  }
		});
	  }
	};
  
	$.fn['csSliderousel']['modules'] = {};
  
	$.fn['csSliderousel']._defaults = {
	  'timeOut': 6000,
	  'speed': 200,
	  'animation': 'slide', //fade, slideHorizontal, slideVertical
	  'easing': 'swing',
	  'pager': true,
	  'nav': true,
	  'autoHideNav': true,
	  'autoPlay': false,
	  'resumeAfterInteraction': false,
	  'removeExcessSpacing': false,
	  'timer': false,
	  'circular': false,
	  'circularMode': 'loop', // 'infinite', 'fill', 'loop'
	  'centerNav': true,
	  'cssanimation': true,
	  'extraRightMargin': 3,
	  'paddingCollapse': true,
	  'cssTransition': 'cubic-bezier(0.39, 0.575, 0.565, 1)',
	  'slideContainer': '.slide-container',
	  'slideWrapper': '.cs-slider-wrapper',
	  'bulletContainer': '.bullet-container',
	  'navContainer': '.nav-container',
	  'sliderMask': '.slider-mask',
	  'slideClass': '.slide',
	  'responsive': true,
	  'responsiveMode': 'partials',
	  'responsiveCenter': false,
	  'dragSlide': true,
	  'slideCount': 4,
	  'upCount': 4,
	  'itemMargin': 0,
	  'itemWidth': 'auto',
	  'minItemWidth': 0,
	  'proportional': true,
	  'onInitialized': $.noop,
	  'onPlay': $.noop,
	  'onPause': $.noop,
	  'onBeforeSlideChange': $.noop,
	  'onAfterSlideChange': $.noop,
	  'resetResize': true,
	  'hoverPause': true,
	  'slideContainerFocus': true,
	  'slideTabIndex': true,
	  'slideLabels': true,
	  'navButtons': false,
	  'defaultSlide': 0 //add a default slide
	};
  
	//Globalize csSliderousel
	window.csSliderousel = csSliderousel;
  
	/**
	 * Responsive Module
	 * @return {[type]} [description]
	 */
	$.fn['csSliderousel']._responsive = function () {
	  var self = this;
  
	  /**
	   * Throttled Resize event
	   */
	  //var $event = $.event,
	  var $specialThrottle,
		dummy = { _: 0 },
		frame = 0,
		wasResized,
		animRunning;
  
	  $specialThrottle = $.event['special']['throttledresize'] = {
		'setup': function () {
		  $(this).on('resize', $specialThrottle['handler']);
		},
		'teardown': function () {
		  $(this).off('resize', $specialThrottle['handler']);
		},
		'handler': function (event, execAsap) {
		  // Save the context
		  var context = this,
			args = arguments;
  
		  wasResized = true;
  
		  if (!animRunning) {
			animRunning = true;
			$specialThrottle.animate(context, args, event, execAsap);
		  }
		},
		'threshold': 3,
		'animate': function (context, args, event, execAsap) {
		  frame++;
  
		  if (frame > $specialThrottle['threshold'] && wasResized || execAsap) {
			event.type = 'throttledresize';
			$.event['dispatch'].apply(context, args);
			wasResized = false;
			frame = 0;
		  }
		  if (frame > 9) {
			window.cancelAnimationFrame($specialThrottle.animate);
			$(dummy).stop();
			animRunning = false;
			frame = 0;
		  }
  
		  if (animRunning) {
			window.requestAnimationFrame(function () {
			  $specialThrottle.animate(context, args, event, execAsap);
			});
		  }
		}
	  };
  
	  if (self.opt['responsive']) {
		$(window).on('throttledresize', function () {
		  console.log('throttledResize')
		  self._updateSlider(false);
		});
	  }
  
	  var $special, resizeTimeout;
  
	  $special = $.event['special']['debouncedresize'] = {
		'setup': function () {
		  $(this).on('resize', $special['handler']);
		},
		'teardown': function () {
		  $(this).off('resize', $special['handler']);
		},
		'handler': function (event, execAsap) {
		  // Save the context
		  var context = this,
			args = arguments,
			dispatch = function () {
			  // set correct event type
			  event.type = 'debouncedresize';
			  $.event['dispatch'].apply(context, args);
			};
  
		  if (resizeTimeout) {
			clearTimeout(resizeTimeout);
		  }
  
		  if (execAsap) {
			dispatch();
		  } else {
			resizeTimeout = setTimeout(dispatch, $special['threshold']);
		  }
		},
		'threshold': 150
	  };
  
	  if (self.opt['responsive']) {
		$(window).on('debouncedresize', function () {
		  self._updateSlider(false);
		});
	  }
	};
  
	//Set responsive module to load
	$.fn['csSliderousel']['modules'].responsive = $.fn['csSliderousel']._responsive;
  
  
	/**
	 * [_backwardsCompatibility description]
	 * @return {[type]} [description]
	 */
	$.fn['csSliderousel']._backwardsCompatibility = function () {
	  /**
	   * Date.now support for IE8 and earlier version.
	   */
	  if (!Date.now) {
		Date.now = function () {
		  return new Date().valueOf();
		};
	  }
  
	  /**
	   * RequestAnimationFrame support
	   * Description: Better animation support for mobile browsers
	   */
	  var lastTime = 0,
		vendors = ['moz', 'webkit', 'o', 'ms'],
		x;
  
	  // Remove vendor prefixing if prefixed and break early if not
	  for (x = 0; x < vendors.length && !window.requestAnimationFrame; x += 1) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	  }
  
	  // Check if full standard supported
	  if (!window.cancelAnimationFrame) {
		// Check if standard partially supported
		if (!window.requestAnimationFrame) {
		  // No support, emulate standard
		  window.requestAnimationFrame = function (callback) {
			var now = new Date().getTime(),
			  nextTime = Math.max(lastTime + 16, now);
  
			return window.setTimeout(function () { callback(lastTime = nextTime); }, nextTime - now);
		  };
  
		  window.cancelAnimationFrame = window.clearTimeout;
		} else {
		  // Emulate cancel for browsers that don't support it
		  vendors = window.requestAnimationFrame;
		  lastTime = {};
  
		  window.requestAnimationFrame = function (callback) {
			var id = x; // Generate the id (x is initialized in the for loop above)
			x += 1;
			lastTime[id] = callback;
  
			// Call the vendors requestAnimationFrame implementation
			vendors(function (timestamp) {
			  if (lastTime.hasOwnProperty(id)) {
				var error;
				try {
				  lastTime[id](timestamp);
				} catch (e) {
				  error = e;
				} finally {
				  delete lastTime[id];
				  if (error) { throw error; } // re-throw the error if an error occurred
				}
			  }
			});
  
			// return the id for cancellation capabilities
			return id;
		  };
  
		  window.cancelAnimationFrame = function (id) {
			delete lastTime[id];
		  };
		}
	  }
	};
  
	//Set responsive module to load
	$.fn['csSliderousel']['modules'].backwardsCompatibility = $.fn['csSliderousel']._backwardsCompatibility;
  
  
	/**
	 * [disableSelection description]
	 * @return {[type]} [description]
	 */
	$.fn.disableSelection = function () {
	  return this.attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);
	};
  
	/**
	 * Object.create support for < ECMA5 browsers
	 */
	if (typeof Object.create !== 'function') {
	  Object.create = function (o) {
		function F() { }
		F.prototype = o;
		return new F();
	  };
	}
  
	/**
	 * Bind fallback
	 */
	if (!Function.prototype.bind) {
	  Function.prototype.bind = function (oThis) {
		if (typeof this !== 'function') {
		  // closest thing possible to the ECMAScript 5 internal IsCallable function
		  throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
		}
  
		var aArgs = Array.prototype.slice.call(arguments, 1),
		  fToBind = this,
		  fNOP = function () { },
		  fBound = function () {
			return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
		  };
  
		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();
  
		return fBound;
	  };
	}
  
  }(jQuery, document, window));
  
  
  //BEGIN TIMING MODULE
  ; (function ($) {
	'use strict';
  
	$.fn['csSliderousel']._activePage = function () {
  
	  var self = this;
  
	  self.el.on('afterInit', function () {
		var currentLocation = window.location.href.toLowerCase();
  
		self.slides.removeClass('active');
  
		self.slides.each(function () {
		  typeof (this.href) !== 'undefined' && currentLocation.indexOf(this.href.toLowerCase()) !== -1 && $(this).addClass('active');
		});
	  });
	};
  
	$.fn['csSliderousel']['modules'].activePage = $.fn['csSliderousel']._activePage;
  
  }(jQuery));; (function ($) {
	'use strict';
  
	$.extend(csSliderousel, {
	  _initTimingModule: function () {
		var self = this;
  
		self._timing = 0;
		self._percent = 0;
		self._pauseTime = 0;
		self._isDragging = false;
	  },
  
	  /**
	   * Update the timer
	   * @param  {string} type The event to update the timer by
	   */
	  _updateTimerContainer: function (type) {
		var self = this;
		if (self.opt['timer']) {
		  switch (type) {
			case 'start':
			  self.timerContainer.children('span')
				.css('width', Math.round(self._percent * 100) + '%')
				.stop()
				.animate({
				  width: '100%'
				}, self.opt['timeOut'] - self._pauseTime, 'linear');
			  break;
  
			case 'restart':
			  self.timerContainer.children('span')
				.stop()
				.css('width', 0 + '%')
				.animate({
				  width: '100%'
				}, self.opt['timeOut'], 'linear');
			  break;
  
			case 'stop':
			  self.timerContainer.children('span').css('width', '0%').stop();
			  break;
  
			case 'pause':
			  self.timerContainer.children('span').stop(); //stop all animation
			  break;
		  }
		}
	  },
  
	  timing: function () {
		var self = this;
  
		return {
		  /**
		   * [_startTimer Start the slider timer]
		   * @param  {[type]} time [description]
		   * @return {[type]}      [description]
		   */
		  _startTimer: function () {
			//If paused, unpause the slider else just reset the pauseTime
			self._paused ? self._paused = false : self._pauseTime = 0;
			self.startTime = self._tick = Date.now();
  
			//Clear the timer just in case
			self.timer && window.cancelAnimationFrame(self.timer);
			self.timer = window.requestAnimationFrame(this._getAnimationFrame.bind(self));
  
			self._updateTimerContainer('start');
		  },
  
		  /**
		   * [_restartTimer Restart the slider timer]
		   * @param  {[type]} stop [description]
		   * @return {[type]}      [description]
		   */
		  _restartTimer: function (stop) {
			self._pauseTime = 0;
			window.cancelAnimationFrame(self.timer);
  
			if (!stop) {
			  self.timing._startTimer();
			} else {
			  self.timing._pauseTimer();
			  self._tick = Date.now();
			  self.timing._updateTime();
			}
  
			self._updateTimerContainer('restart');
		  },
  
		  /**
		   * [_stopTimer Stop the slider timer]
		   * @return {[type]} [description]
		   */
		  _stopTimer: function () {
			window.cancelAnimationFrame(self.timer);
			self._paused = true;
			self._pauseTime = 0;
			self.startTime = Date.now();
  
			self._updateTimerContainer('stop');
		  },
  
		  /**
		   * [_pauseTimer Pause the slider timer]
		   * @return {[type]} [description]
		   */
		  _pauseTimer: function () {
			window.cancelAnimationFrame(self.timer);
			self._paused = true;
			self._pauseTime = Date.now() - self.startTime + self._pauseTime; //get the currently elapsed time, add any already paused time to it
  
			self._updateTimerContainer('pause');
		  },
  
		  /**
		   * [_updateTime Update the slider timer]
		   * @return {[type]} [description]
		   */
		  _updateTime: function () {
			self._percent = (self._tick - self.startTime) / (self.opt['timeOut']);
  
			if (self._percent >= 0) {
			  if (self._pauseTime > 0) {
				self._percent += (self._pauseTime / self.opt['timeOut']);
			  }
  
			  self._percent > 1 && (self._percent = 1); //max out percent at 100
			}
		  },
		  _getAnimationFrame: function () {
			if (!this._paused) {
			  this._tick = Date.now();
			  this.timing._updateTime();
  
			  if (this._percent >= 1) {
				this.next();
				!this._paused && this.timing._restartTimer(); //restart the timer if not paused
			  }
  
			  //Keep calling _getAnimationFrame
			  window.requestAnimationFrame(this.timing._getAnimationFrame.bind(this));
			}
		  }
		};
	  }
	});
  
	$.fn['csSliderousel']['modules'].timing = csSliderousel._initTimingModule;
  }(jQuery));
  
  

  
  //BEGIN TOUCH MODULE
  //TODO: Test on Android and iOS devices
  //TODO: Fix border bounce back transition on swipe
  $.extend(csSliderousel, {
	_initTouchEnabled: function () {
	  var self = this;
  
	  self._dragDelta = self.opt['speed'];
	  self._friction = 0.35;
	  self._mouseDown = false;
  
	  //hook into the system function
	  self.el.on('beforeInit', function () {
		self.el.addClass('no-touch');
	  });
  
	  //Start the mouse delta on mouse down
	  //For this event, calculate the X-axis difference
	  //If greater that 150pixel, advance slides
	  self.slideContainer.on('touchstart.csSliderousel', function (e) {
	  	
		var target = e.target || e.srcElement;
  
		self.el.removeClass('no-touch');
  
		self.slides.blur();

  
		//prevents the browser from trying to drag the image
		//if(target.nodeName === 'IMG') {
		//e.preventDefault();
		//}
  
		self.touchDelta = e.clientX || e.originalEvent.changedTouches[0].pageX;
		self.startSwipe = 0;
  
		if (self.opt['animation'] !== 'fade') {
		  if (self._isCssAnimation) {
			var matrix = $(self.slides.eq(0)).css(self.helpers.getVendorPrefix('transform')).split(',');
			self.startLeft = parseInt(matrix[4], 10);
		  } else {
			self.startLeft = parseInt(self.sliderMask.css('left'), 10) || 0;
		  }
		}
  
		self._mouseDown = true;
  
		if (target.nodeName === 'OBJECT') {
		  self._mouseDown = false; //quick fix for flash videos
		}
	  });
  
	  self.slideContainer.on('mousemove.csSliderousel', function (e) {
		self.el.addClass('no-touch');
	  });
  
	  $('body, html').on('touchmove.csSliderousel', '[data-id=' + self.el.attr('data-id') + ']', function (e) {
		var target = e.target || e.srcElement;

		console.log("swipe")
  
		//Prevents the animation from not accounting for borders using touch events
		self.slides.blur();
		self.slideWrapper.blur();
		self.slides.removeClass('cs-hover');
  
		if (target.nodeName === 'OBJECT') {
		  self._mouseDown = false; //quick fix for flash videos
		}
  
		if (self._mouseDown) {
		  self._isDragging = true;
		  (self.startSwipe == 0) ? self.startSwipe = Date.now() : 0;
  
		  self.tempTouchDelta = Math.abs(self.touchDelta - (e.clientX || e.originalEvent.changedTouches[0].pageX));
  
		  //Allow page scrolling for Android if touchDeltaX is greater than 15 pixels
		  if (self.tempTouchDelta > 7) {
			e.preventDefault();
			e.stopPropagation();
		  }
  
		  if (self.opt['animation'] !== 'fade') {
			if (self._isCssAnimation) {
			  self.slides.css(self.helpers.getVendorPrefix('transition'), '0ms cubic-bezier(0.39, 0.575, 0.565, 1)');
			  self.slides.css(self.helpers.getVendorPrefix('transform'), 'translate3d(' + (self.startLeft - (self.touchDelta - (e.clientX || e.originalEvent.changedTouches[0].pageX)) * self._friction) + 'px, 0, 0)');
			} else {
			  self.sliderMask.css('left', self.startLeft - (self.touchDelta - (e.clientX || e.originalEvent.changedTouches[0].pageX)));
			}
		  }
		}
	  });
  
	  $('body').on('touchend.csSliderousel', '[data-id=' + self.el.attr('data-id') + ']', function (e) {
		//e.stopPropagation();
  
		if (self.tempTouchDelta <= 7) { self._isDragging = false; self._mouseDown = false; return false; }
  
		//minimum swipe speed is 100ms, maximum 500ms
		//self._swipeTimeDelta = (Date.now() - self.startSwipe) > 400 ? self.opt['speed'] : self.opt['speed'] - (Date.now() - self.startSwipe);
  
		if (self.opt['animation'] !== 'fade') {
  
		  if (self._isCssAnimation) {
			var matrix = $(self.slides.eq(0)).css(self.helpers.getVendorPrefix('transform')).split(',') || 'matrix(1, 0, 0, 1, 0, 0)';
			matrix = (matrix == 'none') ? 'matrix(1, 0, 0, 1, 0, 0)' : matrix;
  
			self._swipeTimeDelta = self.opt['speed'] - (Math.abs(Math.abs(parseInt(matrix[4], 10)) - (self._slideIndex * self.slides.eq(0).width())) / self.slides.eq(0).width() * self.opt['speed']);
		  } else {
			self._swipeTimeDelta = self.opt['speed'] - (Math.abs(Math.abs(parseInt(self.sliderMask.css('left'), 10)) - (self._slideIndex * self.slides.eq(0).width())) / self.slides.eq(0).width() * self.opt['speed']);
		  }
		}
  
		if (self._isDragging) {
		  self.touchDelta = self.touchDelta - (e.clientX || e.originalEvent.changedTouches[0].pageX);
  
		  if (self.touchDelta > 30) {
			self.next();
		  } else if (self.touchDelta < -30) {
			self.previous();
		  } else {
			self.goToSlide(self._slideIndex);
		  }
		  self._isDragging = false;
		  //self.helpers.forceWebkitRepaint();
		}
  
		self._mouseDown = false;
	  });
	}
  });
  
  $.fn['csSliderousel']['modules'].touchEnabled = csSliderousel._initTouchEnabled;
  
  function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
	  var pair = vars[i].split("=");
	  if (pair[0] == variable) {
		return pair[1];
	  }
	}
	return (false);
  }