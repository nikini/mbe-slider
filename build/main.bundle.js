/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 32);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_config_options__ = __webpack_require__(29);


window.CipSlider = class {
    constructor(options) {
        /**
         * Cip Slider Options
         *
         * @type {[type]}
         */
        this.options = Object.assign(__WEBPACK_IMPORTED_MODULE_0_config_options__["a" /* default */], options);

        /**
         * The element
         *
         * @type {HTMLElement}
         */
        this.element = null;

        /**
         * Private variable
         *
         * @type {Object}
         */
        this._private = {
            slides: [],
            mousedown: false,
            position: {
                x: 0,
                y: 0
            },
            moved: false,
            bindedEvents: false,

            width: 0,
            height: 0,

            maxSlides: 0,
            currentSlide: {
                x: 0,
                y: 0
            },

            dragStart: {
                x: 0,
                y: 0
            },
            dragMove: {
                x: 0,
                y: 0
            },
            speed: {
                x: 0,
                y: 0
            },
            dragStartTime: 0,
            currentDirection: ''
        };

        /**
         * Initialize the slider
         */
        this.initialize();
    }
};

/* harmony default export */ __webpack_exports__["default"] = (window.CipSlider);

function requireAll(r) {
    r.keys().forEach(r);
}
requireAll(__webpack_require__(31));

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    /**
     * Set the style for an element
     *
     * @param {HTMLElement} element
     * @param {Object} styleObject
     */
    set(element, styleObject = {}) {
        Object.keys(styleObject).forEach(property => {
            element.style[property] = styleObject[property];
        });
    },

    /**
     * Remove the styling from an element
     *
     * @param  {HTMLElement} element
     * @param  {Array} properties
     */
    remove(element, properties) {
        properties.forEach(property => {
            element.style.removeProperty(property);
        });
    }
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    /**
     * Bind an event to an object
     *
     * @param  {HTMLElement}  element
     * @param  {Array}  events
     * @param  {Function}  callback
     * @param  {mixed} thisValue
     */
    bind(element, events = [], callback, thisValue = {}) {
        if (typeof events !== 'object' || !events.length) {
            throw new Error('Cannot attach event with empty name');
        }

        if (!callback) {
            throw new Error('Function for the event does not exist');
        }

        if (!element.bindedEvents) {
            element.bindedEvents = {};
        }

        const usedFunction = callback.bind(thisValue);
        events.forEach(event => {
            if (!element.bindedEvents[event]) {
                element.bindedEvents[event] = [];
            }
            element.bindedEvents[event].push(usedFunction);
            element.addEventListener(event, usedFunction, true);
        });
    },

    /**
     * Bind an event to an object
     *
     * @param  {HTMLElement}  element
     * @param  {Array}  events
     */
    unbind(element, events = []) {
        if (typeof events !== 'object' || events.length) {
            throw new Error('Cannot detach event with empty name');
        }

        events.forEach(event => {
            if (element.bindedEvents[event] && element.bindedEvents[event].length) {
                element.bindedEvents[event].forEach(callback => {
                    element.removeEventListener(event, callback, false);
                });
            }
            element.bindedEvents[event] = [];
        });
    }
});

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (x => {
    let final = Number(x);
    if (isNaN(final) || !isFinite(final)) {
        final = 0;
    }
    return final;
});

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slider__ = __webpack_require__(0);


/**
 * Autoslide the slider (if it's the case)
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.autoSlide = function autoSlide() {
    if (!this.options.autoSlide) {
        return;
    }
    let duration;

    if (this.options.autoSlide === true) {
        duration = 3000;
    } else {
        duration = this.options.autoSlide;
    }

    this.stopAutoSlide();

    if (this.options.autoSlideDirection === 'next') {
        this.autoSlideTimeout = window.setTimeout(this.gotoNextSlide.bind(this), duration);
    } else {
        this.autoSlideTimeout = window.setTimeout(this.gotoPreviousSlide.bind(this), duration);
    }
};

/**
 * Stop the autoslide
 *
 * @return {Function}
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.stopAutoSlide = function stopAutoSlide() {
    if (this.autoSlideTimeout) {
        window.clearTimeout(this.autoSlideTimeout);
    }
};

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slider__ = __webpack_require__(0);


/**
 * Events On Click
 *
 * @param  {Event} event
 *
 * @return {Boolean}
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.click = function click(event) {
    if (this._private.moved && event.preventDefault) {
        event.preventDefault();
        event.stopPropagation();
    }

    return this._private.moved;
};

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slider__ = __webpack_require__(0);


/**
 * Destroy the slider style
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.destroyStyle = function destroyStyle() {
    const elementStyle = this.getElementStyle();
    Object.keys(elementStyle).forEach(property => {
        this.element.style.removeProperty(property);
    });

    const slidesStyle = this.getSlidesStyle();
    Object.keys(slidesStyle).forEach(property => {
        this._private.slides.forEach(slide => {
            slide.style.removeProperty(property);
        });
    });

    const parentStyle = this.getParentStyle();
    Object.keys(parentStyle).forEach(property => {
        this.element.parentNode.style.removeProperty(property);
    });
};

/**
 * Destroy the slider HTML
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.destroyHtml = function destroyHtml() {
    if (!this.element.parentNode.classList.contains('cip-slider')) {
        return;
    }

    const parentNode = this.element.parentNode;
    parentNode.parentNode.insertBefore(this.element, parentNode);
    parentNode.parentNode.removeChild(parentNode);
};

/**
 * Destroy the slider
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.destroy = function destroy() {
    console.time(`destroy #${this.options.id}`);

    this.destroyStyle();
    this.unbindEvents();
    this.destroyHtml();

    console.timeEnd(`destroy #${this.options.id}`);
};

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slider__ = __webpack_require__(0);


/**
 * When the dragging ends
 *
 * @param  {Event} event
 *
 * @return {Boolean}
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.mouseUp = function mouseUp(event) {
    if (this._private.moved && event.preventDefault) {
        event.preventDefault();
    }

    // Dragging stops
    this._private.mousedown = false;

    // Momentum
    if (this._private.speed.x !== 0) {
        this._private.position.x += this._private.speed.x / 8 * this._private.width;
    }
    if (this._private.speed.y !== 0) {
        this._private.position.y += this._private.speed.y / 8 * this._private.height;
    }

    // Calculate the slides
    let slideX = this._private.position.x > 0 ? 0 : Math.round(Math.abs(this._private.position.x) / this._private.width);
    let slideY = this._private.position.y > 0 ? 0 : Math.round(Math.abs(this._private.position.y) / this._private.height);

    if (this.options.neverSkip) {
        slideX = this.neverSkip(slideX + 1, 'x');
        slideY = this.neverSkip(slideY + 1, 'y');
    } else {
        slideX++;
        slideY++;
    }

    this.gotoSlide(slideX, slideY, this.options.animationDuration);

    /**
     * Bind Custom Event
     */
    if (this._private.moved && this.options.onEndDragging && typeof this.options.onEndDragging === 'function') {
        this.options.onEndDragging.call(this);
    }

    return !this._private.moved;
};

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slider__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_to_number__ = __webpack_require__(3);



/**
 * When the dragging moves
 *
 * @param  {Event} event
 *
 * @return {Boolean}
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.mouseMove = function mouseMove(event) {
    if (!this._private.mousedown || !this.slidingProperly(event)) {
        return true;
    }

    // console.time('move');

    event.preventDefault();

    let move = false;

    const pos = this.getMousePosition(event);
    const difX = pos.x - this._private.dragMove.x;
    const difY = pos.y - this._private.dragMove.y;
    let finalX = this._private.position.x + difX;
    let finalY = this._private.position.y + difY;

    this._private.speed.x = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_to_number__["a" /* default */])(difX / (Date.now() - this._private.dragStartTime));
    this._private.speed.y = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_to_number__["a" /* default */])(difY / (Date.now() - this._private.dragStartTime));

    if (this.options.direction === 'horizontal' && difX !== 0) {
        move = true;
        finalY = 0;

        if (finalX > 0) {
            finalX = (pos.x - this._private.dragStart.x) * (this.options.pullMargin / 100);
        } else if (finalX < -(this._private.totalSlides - 1) * this._private.width) {
            finalX = -((this._private.totalSlides - 1) * this._private.width) + (pos.x - this._private.dragStart.x) * (this.options.pullMargin / 100);
        }

        this._private.speed.y = 0;
    } else if (this.options.direction === 'vertical' && difY !== 0) {
        move = true;
        finalX = 0;

        if (finalY > 0) {
            finalY = (pos.y - this._private.dragStart.y) * (this.options.pullMargin / 100);
        } else if (finalY < -(this._private.totalSlides - 1) * this._private.height) {
            finalY = -((this._private.totalSlides - 1) * this._private.height) + (pos.y - this._private.dragStart.y) * (this.options.pullMargin / 100);
        }

        this._private.speed.x = 0;
    }

    if (move) {
        this._private.moved = true;
        this.moveTo(finalX, finalY);
    }

    this._private.dragStartTime = Date.now();

    this._private.dragMove.x = pos.x;
    this._private.dragMove.y = pos.y;

    /**
     * Bind Custom Event
     */
    if (this.options.onDragging && typeof this.options.onDragging === 'function') {
        this.options.onDragging.call(this);
    }

    // console.timeEnd('move');

    return false;
};

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slider__ = __webpack_require__(0);


/**
 * When the dragging starts
 *
 * @param  {Event} event
 *
 * @return {Boolean}
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.mouseDown = function mouseDown(event) {
    if (event.which === 1 && event.preventDefault) {
        event.preventDefault();
    }

    // Moved mouse
    this._private.moved = false;

    // Get the mouse position
    const pos = this.getMousePosition(event);

    // Remove animaton
    this.setAnimation(0);

    // Dragging starts
    this._private.mousedown = true;

    // For the momentum
    this._private.dragStart.x = pos.x;
    this._private.dragStart.y = pos.y;

    this._private.speed.x = 0;
    this._private.speed.y = 0;

    // Reset the direction
    this._private.currentDirection = 0;

    this._private.dragStartTime = Date.now();

    // For the dragging
    this._private.dragMove.x = pos.x;
    this._private.dragMove.y = pos.y;

    /**
     * Bind Custom Event
     */
    if (this.options.onStartDragging && typeof this.options.onStartDragging === 'function') {
        this.options.onStartDragging.call(this);
    }

    return false;
};

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slider__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_eventor__ = __webpack_require__(2);



/**
 * Bind all the events of the slider
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.bindEvents = function bindEvents() {
    if (this.bindedEvents) {
        return;
    }

    __WEBPACK_IMPORTED_MODULE_1__helpers_eventor__["a" /* default */].bind(this.element, this.getEventName('start'), this.mouseDown, this);
    __WEBPACK_IMPORTED_MODULE_1__helpers_eventor__["a" /* default */].bind(document, this.getEventName('move'), this.mouseMove, this);
    __WEBPACK_IMPORTED_MODULE_1__helpers_eventor__["a" /* default */].bind(document, this.getEventName('end'), this.mouseUp, this);
    __WEBPACK_IMPORTED_MODULE_1__helpers_eventor__["a" /* default */].bind(this.element, this.getEventName('click'), this.click, this);
    __WEBPACK_IMPORTED_MODULE_1__helpers_eventor__["a" /* default */].bind(window, ['resize'], this.resize, this);

    if (this.options.navigation && this.options.navigation.keys) {
        __WEBPACK_IMPORTED_MODULE_1__helpers_eventor__["a" /* default */].bind(window, ['keydown'], this.keyDown, this);
    }

    if (this.options.navigation && this.options.navigation.type && this.options.navigation.clickable) {
        const nodes = this.element.parentNode.querySelector(`.${this.options.navigation.className}`).children;
        Array.prototype.forEach.call(nodes, element => {
            __WEBPACK_IMPORTED_MODULE_1__helpers_eventor__["a" /* default */].bind(element, this.getEventName('click'), this.navigationClick, this);
        });
    }

    this.bindedEvents = true;
};

/**
 * Unbind all the events from the slider
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.unbindEvents = function unbindEvents() {
    __WEBPACK_IMPORTED_MODULE_1__helpers_eventor__["a" /* default */].unbind(this.element, this.getEventName('start'));
    __WEBPACK_IMPORTED_MODULE_1__helpers_eventor__["a" /* default */].unbind(document, this.getEventName('move'));
    __WEBPACK_IMPORTED_MODULE_1__helpers_eventor__["a" /* default */].unbind(document, this.getEventName('end'));
    __WEBPACK_IMPORTED_MODULE_1__helpers_eventor__["a" /* default */].unbind(this.element, this.getEventName('click'));
    __WEBPACK_IMPORTED_MODULE_1__helpers_eventor__["a" /* default */].unbind(window, ['resize']);

    if (this.options.navigation && this.options.navigation.keys) {
        __WEBPACK_IMPORTED_MODULE_1__helpers_eventor__["a" /* default */].unbind(window, ['keydown']);
    }

    this.bindedEvents = false;
};

/**
 * Get the name of the event based on the options and everything
 *
 * @param  {string} type
 *
 * @return {Array}
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.getEventName = function getEventName(type) {
    const events = {
        start: ['touchstart'],
        move: ['touchmove'],
        end: ['touchend'],
        click: ['click']
    };

    if (this.options.navigation && this.options.navigation.drag) {
        events.start.push('mousedown');
        events.move.push('mousemove');
        events.end.push('mouseup');
    }

    return events[type] || [];
};

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slider__ = __webpack_require__(0);


/**
 * Get the Mouse Position
 *
 * @param  {Event} event
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.getMousePosition = function getMousePosition(event) {
    const e = event || window.event;

    return {
        x: e.pageX,
        y: e.pageY
    };
};

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slider__ = __webpack_require__(0);


/**
 * Get the current axe
 *
 * @return {string}
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.getCurrentAxe = function getCurrentAxe() {
  return this.options.direction === 'horizontal' ? 'x' : 'y';
};

/**
 * Get the current slide index
 *
 * @return {number}
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.getCurrentSlideIndex = function getCurrentSlideIndex() {
  const axe = this.getCurrentAxe();
  return this._private.currentSlide[axe];
};

/**
 * Get the current slide
 *
 * @return {Slide}
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.getCurrentSlide = function getCurrentSlide() {
  const index = this.getCurrentSlideIndex();
  return this._private.slides[index - 1];
};

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slider__ = __webpack_require__(0);


/**
 * Go to the slide x and y
 *
 * @param  {Number} x
 * @param  {Number} y
 * @param  {Boolean|Number} animate
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.gotoSlide = function gotoSlide(x = 0, y = 0, animate = true) {
    const duration = (animate === true ? this.options.slideDuration : animate) || 0;

    // Set the animation to animate
    this.setAnimation(duration);

    // Make it within proportions
    if (x > this._private.totalSlides) {
        x = this._private.totalSlides;
    } else if (x <= 0) {
        x = 1;
    }

    // Make it within proportions
    if (y > this._private.totalSlides) {
        y = this._private.totalSlides;
    } else if (y <= 0) {
        y = 1;
    }

    this._private.currentSlide.x = x;
    this._private.currentSlide.y = y;

    this.moveTo(-(x - 1) * this._private.width, -(y - 1) * this._private.height);

    // Set the navigation item as selected
    this.setNavigationItem();

    // Set the navigation arrows
    this.setNavigationArrows();

    // Set timeout
    window.setTimeout(this.afterSlide.bind(this), duration);
};

/**
 * Called after the animation is done
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.afterSlide = function afterSlide() {
    // Autoslide
    this.autoSlide();

    // Infinite
    if (this.options.infinite) {
        if (this.options.direction === 'horizontal') {
            if (this._private.currentSlide.x === this._private.totalSlides) {
                this.gotoSlide(2, this._private.currentSlide.y, false);
            }
            if (this._private.currentSlide.x === 1) {
                this.gotoSlide(this._private.totalSlides - 1, this._private.currentSlide.y, false);
            }
        } else {
            if (this._private.currentSlide.y === this._private.totalSlides) {
                this.gotoSlide(this._private.currentSlide.x, 2, false);
            }
            if (this._private.currentSlide.y === 1) {
                this.gotoSlide(this._private.currentSlide.x, this._private.totalSlides - 1, false);
            }
        }
    }

    // After Slide Event
    if (this.options.afterSlide && typeof this.options.afterSlide === 'function') {
        this.options.afterSlide.call(this, this.getCurrentSlideIndex(), this.getCurrentSlide());
    }
};

/**
 * Go to the next slide
 *
 * @param  {Boolean|Number} animate
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.gotoNextSlide = function gotoNextSlide(animate) {
    const current = {
        x: this._private.currentSlide.x,
        y: this._private.currentSlide.y
    };

    if (this.options.direction === 'horizontal') {
        if (current.x < this._private.totalSlides) {
            current.x++;
        } else {
            if (this.options.infinite) {
                current.x = 1;
            } else {
                this.stopAutoSlide();
                return;
            }
        }
    } else {
        if (current.y < this._private.totalSlides) {
            current.y++;
        } else {
            if (this.options.infinite) {
                current.y = 1;
            } else {
                this.stopAutoSlide();
                return;
            }
        }
    }

    this.gotoSlide(current.x, current.y, animate);
};

/**
 * Go to the previous slide
 *
 * @param  {Boolean|Number} animate
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.gotoPreviousSlide = function gotoPreviousSlide(animate) {
    const current = {
        x: this._private.currentSlide.x,
        y: this._private.currentSlide.y
    };

    if (this.options.direction === 'horizontal') {
        if (current.x > 1) {
            current.x--;
        } else {
            if (this.options.infinite) {
                current.x = this._private.maxSlides;
            } else {
                this.stopAutoSlide();
                return;
            }
        }
    } else {
        if (current.y > 1) {
            current.y--;
        } else {
            if (this.options.infinite) {
                current.y = this._private.maxSlides;
            } else {
                this.stopAutoSlide();
                return;
            }
        }
    }

    this.gotoSlide(current.x, current.y, animate);
};

/**
 * Go to the first slide
 *
 * @param  {Boolean|Number} animate
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.gotoFirstSlide = function gotoFirstSlide(animate) {
    let slide = 1;
    const current = {
        x: slide,
        y: slide
    };

    if (this.options.infinite) {
        slide++;
    }

    if (this.options.direction === 'horizontal') {
        current.x = slide;
    } else {
        current.y = slide;
    }

    this.gotoSlide(current.x, current.y, animate);
};

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slider__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_styler__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_remove_white_space__ = __webpack_require__(30);




/**
 * Init the CSS Function
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.initStyle = function initStyle() {
    const elementStyle = this.getElementStyle();
    __WEBPACK_IMPORTED_MODULE_1__helpers_styler__["a" /* default */].set(this.element, elementStyle);

    const slidesStyle = this.getSlidesStyle();
    this._private.slides.forEach(slide => {
        __WEBPACK_IMPORTED_MODULE_1__helpers_styler__["a" /* default */].set(slide.element, slidesStyle);
    });

    const parentStyle = this.getParentStyle();
    __WEBPACK_IMPORTED_MODULE_1__helpers_styler__["a" /* default */].set(this.element.parentNode, parentStyle);
};

/**
 * Init the HTML Function
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.initHtml = function initHtml() {
    if (this.element.parentNode.classList.contains('cip-slider')) {
        return;
    }

    // Remove the white space
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__helpers_remove_white_space__["a" /* default */])(this.element);

    // Create the element
    const wrapper = document.createElement('div');
    const clone = this.element.cloneNode(true);

    // Get the element classes
    wrapper.setAttribute('class', this.element.className);

    // Add The parent class
    wrapper.classList.add('cip-slider');

    // Make the element to be the parent
    wrapper.appendChild(clone);
    this.element.parentNode.replaceChild(wrapper, this.element);

    // Refetch the element
    this.setElement(clone);

    // Initialize the slides HTML now (if there are any)
    // If infinite duplicate the first and last element
    if (this.options.infinite && this.element.children.length) {
        const length = this.element.children.length;

        // Clone the first and the last element
        const firstClone = this.element.children[0].cloneNode(true);
        const lastClone = this.element.children[length - 1].cloneNode(true);

        // Using setattribute instead of dataset for ie's sake
        firstClone.setAttribute('data-ignore', 1);
        lastClone.setAttribute('data-ignore', 1);

        // Append the firstclone and prepend the lastclone
        this.element.appendChild(firstClone);
        this.element.insertBefore(lastClone, this.element.children[0]);
    }
};

/**
 * Init the Slider
 *
 * @return Slider
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.initialize = function initialize() {
    // Set the main element
    this.setElement(this.options.element);

    // Init the html
    this.initHtml();

    // Set the slides
    this.setSlides();

    // Init the CSS
    this.initStyle();

    // Set the width of the slider
    this._private.width = this.element.offsetWidth;
    this._private.height = this.element.offsetHeight;

    // Get the number of slides
    this._private.totalSlides = this._private.slides.length;
    this._private.currentSlide.x = 1;
    this._private.currentSlide.y = 1;

    // Append arrows
    this.appendArrows();

    // Append navigation
    this.appendNavigation();

    // Set the data to the parent
    this.setData();

    // Bind the events
    this.bindEvents();

    // Autoslide
    this.autoSlide();

    // Go to first slide
    this.gotoFirstSlide(false);

    // Init Event
    if (this.options.onInit && typeof this.options.onInit === 'function') {
        this.options.onInit.call(this);
    }

    return this;
};

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slider__ = __webpack_require__(0);


/**
 * Events on key down
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.keyDown = function keyDown(event) {
    const code = event.keyCode || event.which;
    if (this.options.direction === 'horizontal') {
        if (code === 39) {
            // Right
            event.preventDefault();
            this.gotoNextSlide(true);
        } else if (code === 37) {
            // Left
            event.preventDefault();
            this.gotoPreviousSlide(true);
        }
    } else {
        if (code === 40) {
            // Up
            event.preventDefault();
            this.gotoNextSlide(true);
        } else if (code === 38) {
            // Down
            event.preventDefault();
            this.gotoPreviousSlide(true);
        }
    }
};

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slider__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_to_number__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_styler__ = __webpack_require__(1);




/**
 * Move the object to a certain point
 *
 * @param  {Number} x
 * @param  {Number} y
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.moveTo = function moveTo(x = 0, y = 0) {
    if (this.options.direction === 'horizontal') {
        y = 0;
    } else if (this.options.direction === 'vertical') {
        x = 0;
    }

    this._private.position.x = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_to_number__["a" /* default */])(x);
    this._private.position.y = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_to_number__["a" /* default */])(y);

    __WEBPACK_IMPORTED_MODULE_2__helpers_styler__["a" /* default */].set(this.element, {
        '-webkit-transform': `translate(${x}px, ${y}px)`,
        '-moz-transform': `translate(${x}px, ${y}px)`,
        '-o-transform': `translate(${x}px, ${y}px)`,
        '-ms-transform': `translate(${x}px, ${y}px)`,
        transform: `translate(${x}px, ${y}px)`
    });
};

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slider__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_eventor__ = __webpack_require__(2);



/**
 * Append the arrows
 *
 * @return void
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.appendArrows = function appendArrows() {
    if (!(this.options.navigation && this.options.navigation.arrows)) {
        return;
    }

    // Setup the back arrow
    const arrowBack = document.createElement('a');
    arrowBack.classList.add('cip-arrow-back');
    arrowBack.setAttribute('href', '#go-back');
    __WEBPACK_IMPORTED_MODULE_1__helpers_eventor__["a" /* default */].bine(arrowBack, this.getEventName('click'), this.arrowBackClick, this);

    // Setup the forward arrow
    const arrowForward = document.createElement('a');
    arrowForward.classList.add('cip-arrow-forward');
    arrowForward.setAttribute('href', '#go-forward');
    __WEBPACK_IMPORTED_MODULE_1__helpers_eventor__["a" /* default */].bine(arrowForward, this.getEventName('click'), this.arrowForwardClick, this);

    // Setup the container for the arrows
    const navigation = document.createElement('div');
    navigation.classList.add('cip-navigation-arrows');
    navigation.appendChild(arrowBack);
    navigation.appendChild(arrowForward);

    // Append everything to the parent
    this.element.parentNode.appendChild(navigation);

    // Set the navigation arrows
    this.setNavigationArrows();
};

/**
 * Go Back arrow click
 *
 * @param {Event} event
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.arrowBackClick = function arrowBackClick(event) {
    event.preventDefault();
    this.gotoPreviousSlide(true);
};

/**
 * Go Forward arrow click
 *
 * @param {Event} event
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.arrowForwardClick = function arrowForwardClick(event) {
    event.preventDefault();
    this.gotoNextSlide(true);
};

/**
 * Set the navigation arrows
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.setNavigationArrows = function setNavigationArrows() {
    if (!(this.options.navigation && this.options.navigation.arrows)) {
        return;
    }
    const currentSlide = this.getCurrentSlideIndex();

    const arrowBack = this.element.parentNode.querySelector('.cip-arrow-back');
    if (currentSlide <= 1) {
        // First
        arrowBack.classList.add('hidden');
    } else {
        arrowBack.classList.remove('hidden');
    }

    const arrowForward = this.element.parentNode.querySelector('.cip-arrow-forward');
    if (currentSlide >= this._private.maxSlides) {
        // Last
        arrowForward.classList.add('hidden');
    } else {
        arrowForward.classList.remove('hidden');
    }
};

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slider__ = __webpack_require__(0);


/**
 * Append navigation
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.appendNavigation = function appendNavigation() {
    if (!(this.options.navigation && this.options.navigation.type)) {
        return;
    }

    // Make to lower case
    this.options.navigation.type = this.options.navigation.type.toLowerCase();

    // Make sure the type is allowed
    if (['bullets', 'thumbs'].indexOf(this.options.navigation.type) < 0) {
        this.options.navigation.type = 'bullets';
    }

    // Create the navigation
    const navigation = document.createElement('div');
    const navigationClass = this.options.navigation.className;

    // Add the class to navigation
    navigation.classList.add(navigationClass);
    navigation.classList.add(`${navigationClass}-${this.options.navigation.type}`);

    // Add all elements
    this._private.slides.forEach((element, index) => {
        if (element.ignore) {
            return;
        }
        const navigationItem = document.createElement('div');

        // Add the classes
        navigationItem.classList.add(`${navigationClass}-item`);
        navigationItem.classList.add(`${navigationClass}-item-${index}`);

        // Add the selected class to the first element
        if (index === 0) {
            navigationItem.classList.add(`${navigationClass}-item-selected`);
        }

        // Append an image if they are thumbs
        if (this.options.navigation.type === 'thumbs' && element.getAttribute('data-thumb')) {
            const img = document.createElement('img');
            img.src = element.getAttribute('data-thumb');
            navigationItem.appendChild(img);
        }

        // Set the slide in the data attribute
        navigationItem.setAttribute('data-slide', index + 1);

        // Append the item
        navigation.appendChild(navigationItem);
    }, this);

    this.element.parentNode.appendChild(navigation);

    // Set the navigation item as selected
    this.setNavigationItem();
};

/**
 * What happens when you click on an item
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.navigationClick = function navigationClick(event) {
    event.preventDefault();

    const slide = parseInt(event.currentTarget.getAttribute('data-slide'), 10);
    if (this.options.direction === 'horizontal') {
        this.gotoSlide(slide, 1, true);
    } else {
        this.gotoSlide(1, slide, true);
    }
};

/**
 * Set the navigation item
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.setNavigationItem = function setNavigationItem() {
    if (!(this.options.navigation && this.options.navigation.type)) {
        return;
    }

    let currentSlide = this.getCurrentSlideIndex();
    if (this.options.infinite) {
        currentSlide--;
        if (currentSlide === 0) {
            currentSlide = this._private.maxSlides;
        }
        if (currentSlide > this._private.maxSlides) {
            currentSlide = 1;
        }
    }

    const navigationClass = this.options.navigation.className;
    const navigationItems = this.element.parentNode.querySelector(`.${navigationClass}`).children;
    Array.prototype.forEach.call(navigationItems, (element, index) => {
        element.classList.remove(`${navigationClass}-item-selected`);
        if (index === currentSlide - 1) {
            element.classList.add(`${navigationClass}-item-selected`);
        }
    });
};

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slider__ = __webpack_require__(0);


/**
 * Never skip a frame
 *
 * @param  {Number} slide
 * @param  {string} axis
 *
 * @return {Object}
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.neverSkip = function neverSkip(slide, axis) {
    if (axis.toLowerCase() === 'x' && this.options.direction === 'horizontal') {
        if (slide > this._private.currentSlide.x + 1) {
            return this._private.currentSlide.x + 1;
        }
        if (slide < this._private.currentSlide.x - 1) {
            return this._private.currentSlide.x - 1;
        }
    } else if (axis.toLowerCase() === 'y' && this.options.direction === 'vertical') {
        if (slide > this._private.currentSlide.y + 1) {
            return this._private.currentSlide.y + 1;
        }
        if (slide < this._private.currentSlide.y - 1) {
            return this._private.currentSlide.y - 1;
        }
    }
    return slide;
};

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slider__ = __webpack_require__(0);


/**
 * Refreshes the slider slides
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.refreshSlides = function refreshSlides() {
    this.destroyStyle();
    this.setSlides();
    this.initStyle();
};

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slider__ = __webpack_require__(0);


/**
 * Events on resize
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.resize = function resize() {
    // Set the width of the slider
    this._private.width = this.element.offsetWidth;
    this._private.height = this.element.offsetHeight;

    // Move to the current slide
    this.gotoSlide(this._private.currentSlide.x, this._private.currentSlide.y, false);

    return this._private.moved;
};

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slider__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_styler__ = __webpack_require__(1);



/**
 * Set the animation to the slider
 *
 * @param {number} duration
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.setAnimation = function setAnimation(duration) {
    if (duration > 0) {
        __WEBPACK_IMPORTED_MODULE_1__helpers_styler__["a" /* default */].set(this.element, {
            '-webkit-transform-style': 'preserve-3d',
            '-webkit-backface-visibility': 'hidden',
            '-webkit-perspective': 1000,

            '-webkit-transition-property': 'all',
            '-moz-transition-property': '-moz-transform',
            '-o-transition-property': '-o-transform',
            '-ms-transition-property': '-ms-transform',
            'transition-property': 'transform',

            '-webkit-transition-duration': `${duration}ms`,
            '-moz-transition-duration': `${duration}ms`,
            '-o-transition-duration': `${duration}ms`,
            '-ms-transition-duration': `${duration}ms`,
            'transition-duration': `${duration}ms`,

            '-webkit-transition-timing-function': this.options.transitionTimingFunction,
            '-moz-transition-timing-function': this.options.transitionTimingFunction,
            '-o-transition-timing-function': this.options.transitionTimingFunction,
            '-ms-transition-timing-function': this.options.transitionTimingFunction,
            'transition-timing-function': this.options.transitionTimingFunction
        });
    } else {
        __WEBPACK_IMPORTED_MODULE_1__helpers_styler__["a" /* default */].remove(this.element, ['-webkit-transition-property', '-moz-transition-property', '-o-transition-property', '-ms-transition-property', 'transition-property', '-webkit-transition-duration', '-moz-transition-duration', '-o-transition-duration', '-ms-transition-duration', 'transition-duration', '-webkit-transition-timing-function', '-moz-transition-timing-function', '-o-transition-timing-function', '-ms-transition-timing-function', 'transition-timing-function']);
    }
};

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slider__ = __webpack_require__(0);


/**
 * Set the parent data to the node data
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.setData = function setData() {
    // Not using dataset because of IE's lack of support
    Array.prototype.forEach.call(this.element.attributes, attribute => {
        if (/^data-/i.test(attribute.name)) {
            // Is a data attribute
            this.element.parentNode.setAttribute(attribute.name, attribute.value);
        }
    }, this);
};

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slider__ = __webpack_require__(0);


__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.setElement = function setElement(element) {
    if (typeof element === 'string') {
        this.element = document.querySelector(element);
    } else {
        this.element = element;
    }

    if (!this.element) {
        throw new Error('Element cannot be found or is null');
    }
};

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slider__ = __webpack_require__(0);


__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.setSlides = function setSlides() {
    this._private.slides = [];
    this._private.maxSlides = 0;

    Array.prototype.forEach.call(this.element.children, child => {
        // Get the ignore data attribute
        const ignore = Number(child.getAttribute('data-ignore'));
        let index = -1;

        if (!ignore) {
            this._private.maxSlides++;
            index = this._private.maxSlides;
        }

        this._private.slides.push({
            index,
            ignore: Boolean(ignore),
            element: child
        });
    });
};

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slider__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_styler__ = __webpack_require__(1);



/**
 * Hide the slider
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.hide = function hide() {
    __WEBPACK_IMPORTED_MODULE_1__helpers_styler__["a" /* default */].set(this.element.parentNode, {
        display: 'none'
    });
};

/**
 * Show the slider
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.show = function show() {
    __WEBPACK_IMPORTED_MODULE_1__helpers_styler__["a" /* default */].set(this.element.parentNode, {
        display: 'block'
    });
};

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slider__ = __webpack_require__(0);


/**
 * Check wether the person is sliding horizontally or vertically
 *
 * @param  {Event} event
 *
 * @return {Boolean}
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.slidingProperly = function slidingProperly(event) {
    const a = this.getMousePosition(event);
    const b = this._private.dragStart;
    const distX = Math.abs(a.x - b.x);
    const distY = Math.abs(a.y - b.y);

    if (distX < 10 && distY < 10) {
        return true;
    }

    if (!this._private.currentDirection) {
        this._private.currentDirection = distX > distY ? 'horizontal' : 'vertical';
    }

    return this._private.currentDirection === this.options.direction;
};

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slider__ = __webpack_require__(0);


/**
 * Get the style of the element
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.getElementStyle = function getElementStyle() {
    const elementStyle = {
        'list-style': 'none',
        margin: '0',
        padding: '0'
    };
    switch (this.options.direction) {
        case 'horizontal':
            elementStyle['white-space'] = 'nowrap';
            break;
        case 'vertical':
            elementStyle.height = '100%';
            break;
    }
    return elementStyle;
};

/**
 * Get the style of the slides
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.getSlidesStyle = function getSlidesStyle() {
    const slidesStyle = {
        margin: '0',
        padding: '0',
        height: '100%'
    };
    if (this.options.direction === 'horizontal') {
        slidesStyle.display = 'inline-block';
        slidesStyle['vertical-align'] = 'middle';
        slidesStyle.width = '100%';
    } else {
        slidesStyle.display = 'block';
        slidesStyle.width = 'auto';
    }
    return slidesStyle;
};

/**
 * Get the style of the parent
 */
__WEBPACK_IMPORTED_MODULE_0__slider__["default"].prototype.getParentStyle = function getParentStyle() {
    const parentStyle = {
        overflow: 'hidden'
    };
    if (this.options.direction === 'vertical') {
        parentStyle.height = '100%';
    }
    return parentStyle;
};

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  /**
   * The element being transformed into a slider
   *
   */
  element: null,

  /**
   * Direction of the slider (can be "horizontal"/"vertical")
   *
   * @type {string}
   */
  direction: 'horizontal',

  /**
   * Options regarding navigation through the slider
   *
   * @type {Object}
   */
  navigation: {
    /**
     * Can you drag the slider (for desktop)
     *
     * @type {Boolean}
     */
    drag: true,

    /**
     * What kind of navigation should there be (other than drag)
     * Can be either "thumbs", "bullets" or false (for none)
     *
     * @type {string}
     */
    type: 'bullets',

    /**
     * Class name of the navigation
     *
     * @type {string}
     */
    className: 'cip-slider-navigation',

    /**
     * Should the slider have arrows (to navigate) or not
     *
     * @type {Boolean}
     */
    arrows: false,

    /**
     * Are the bullets/thumbs navigatable or not
     *
     * @type {Boolean}
     */
    clickable: true,

    /**
     * Navigate using the keys (left/right and up/down keys) for desktop
     *
     * @type {Boolean}
     */
    keys: false
  },

  /**
   * The duration of the animation (when dragging stops)
   *
   * @type {number}
   */
  animationDuration: 300,

  /**
   * The duration of the movement from slide to slide
   *
   * @type {number}
   */
  slideDuration: 900,

  /**
   * How long should you be able to pull from the margin
   *
   * @type {number}
   */
  pullMargin: 20,

  /**
   * Wether to skip a slide or not (depending on inertia)
   *
   * @type {Boolean}
   */
  neverSkip: true,

  /**
   * AutoSlide duration (in milliseconds, if zero then no autoslide)
   *
   * @type {number}
   */
  autoSlide: 0,

  /**
   * Which direction to autoslide to (can be 'next' or 'previous')
   *
   * @type {string}
   */
  autoSlideDirection: 'next',

  /**
   * Wether to make it an infinite slider or not
   *
   * @type {Boolean}
   */
  infinite: false,

  /**
   * Event called when you initialize the slider
   */
  onInit() {},

  /**
   * Event called when a slide changed or not
   */
  afterSlide() {},

  /**
   * Event called when the user starts dragging
   */
  onStartDragging() {},

  /**
   * Event called while the user is dragging
   */
  onDragging() {},

  /**
   * Event called when the user has stopped dragging
   */
  onEndDragging() {},

  /**
   * What CSS transition property to use (when transitioning)
   *
   * @type {string}
   */
  transitionProperty: 'all',

  /**
   * The duration of the CSS transition (when transitioning)
   *
   * @type {string}
   */
  transitionDuration: '200ms',

  /**
   * The transition timing function of the CSS (when transitioning)
   *
   * @type {string}
   */
  transitionTimingFunction: 'cubic-bezier(0.33, 0.66, 0.66, 1)'
});

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (element => {
    Array.prototype.forEach.call(element.childNodes, node => {
        if (node.nodeType === 3 && !/\S/.test(node.nodeValue)) {
            element.removeChild(node);
        }
    });
});

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./autoslide.js": 4,
	"./click.js": 5,
	"./destroy.js": 6,
	"./drag-end.js": 7,
	"./drag-move.js": 8,
	"./drag-start.js": 9,
	"./event-functions.js": 10,
	"./get-mouse-position.js": 11,
	"./get.js": 12,
	"./goto.js": 13,
	"./initialization.js": 14,
	"./key-events.js": 15,
	"./movement.js": 16,
	"./navigation-arrows.js": 17,
	"./navigation-bullets.js": 18,
	"./never-skip.js": 19,
	"./refresh.js": 20,
	"./resize.js": 21,
	"./set-animation.js": 22,
	"./set-data.js": 23,
	"./set-element.js": 24,
	"./set-slides.js": 25,
	"./show-hide.js": 26,
	"./sliding-properly.js": 27,
	"./styling.js": 28
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 31;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map