var mbeHelper = mbeHelper || {};

var mbeSlider = (function () {
    "use strict";

    /**
     * The Class
     *
     * @param  Object options
     *
     * @return void
     */
    var mbeSlider = function (options) {

        /**
         * Mbe Slider Options
         *
         * @type {[type]}
         */
        this.options = mbeHelper.mergeObjects({

            /**
             * The element being transformed into a slider
             *
             */
            element: null,

            /**
             * Properties
             *
             */
            direction: 'horizontal', //vertical
            navigation: {
                drag: true, //enable drag for pc
                type: 'bullets', //can be either 'thumbs', 'bullets' or false
                className: 'mbe-slider-navigation', //the slider navigation css class
                arrows: false,
                clickable: true, //navigation is clickable or not
                keys: false //enable left/right and up/down keys for PC
            },

            animationDuration: 300, //the duration of the animation (when dragging stops)
            slideDuration: 900, //the duration of the movement from slide to slide
            pullMargin: 20, //percent of pull margin
            neverSkip: false, //wether to skip a slide or not (depending on inertia)

            /**
             * Events
             *
             */
            onInit: false, //called when you initialize the slider
            afterSlide: false, //called when a slide changed or not
            onStartDragging: false, //called when the user starts dragging
            onDragging: false, //called while the user is dragging
            onEndDragging: false, //called when the user has stopped dragging

            /**
             * Transitions Properties
             *
             */
            transitionProperty: 'all',
            transitionDuration: '200ms',
            transitionTimingFunction: 'cubic-bezier(0.33, 0.66, 0.66, 1)'


        }, options);

        /**
         * The element
         *
         * @type {[type]}
         */
        this.element = null;

        /**
         * Private variable
         *
         * @type object
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
         * Init the mbe Slider
         *
         */
        this.init();
    };

    return mbeSlider;

}());
;(function () {

    /**
     * Remove white space between tags
     *
     * @param  string type
     * @param  function func
     *
     * @return
     */
    Node.prototype.mbeRmoveWhiteSpace = function () {
        var i;
        for (i = 0; i < this.childNodes.length; i++) {
            var node = this.childNodes[i];
            if (node.nodeType == 3 && !/\S/.test(node.nodeValue)) {
                this.removeChild(node);
            }
        }
    };

}());
;(function () {

    /**
     * Throw an mbe Slider Error
     *
     * @param String errorString
     * @param String functionName
     * @param Object object
     *
     * @return void
     */
    mbeHelper.throwError = function (errorString, functionName, object) {
        throw {
            'name': 'mbeSliderException',
            'message': errorString,
            'log': {
                'function': functionName,
                'object': object || null
            },
            'toString': function () {
                return this.name + ' > ' + this.log.function + ': ' + this.message;
            }
        };
    };

}());
;(function () {

    /**
     * Bind an event to an object
     *
     * @param  array events
     * @param  function func
     * @param  object thisValue
     *
     * @return
     */
    Node.prototype.mbeBindEvent = function (events, func, thisValue) {

        if (!events) {
            mbeHelper.throwError('Cannot attach event with empty name', 'mbeBindEvent', this);
            return;
        }

        if (!func) {
            mbeHelper.throwError('Function for the event does not exist', 'mbeBindEvent', this);
            return;
        }

        var usedFunction = func.bind(thisValue);

        if (!this.bindedEvents) {
            this.bindedEvents = {};
        }

        events.forEach(function (event, value) {

            if (!this.bindedEvents[event]) {
                this.bindedEvents[event] = [];
            }
            this.bindedEvents[event].push(usedFunction);

            if (this.addEventListener) {
                this.addEventListener(event, usedFunction, false);
            } else {
                this.attachEvent('on' + event, usedFunction);
            }
        }, this);
    };
    Window.prototype.mbeBindEvent = Node.prototype.mbeBindEvent;

    /**
     * Unbind an event from an object
     *
     * @param  array events
     * @param  function func
     * @param  object thisValue
     *
     * @return
     */
    Node.prototype.mbeUnbindEvent = function (events, func, thisValue) {

        if (!events) {
            mbeHelper.throwError('Cannot dettach event with empty name', 'mbeUnbindEvent', this);
            return;
        }

        if (!func) {
            mbeHelper.throwError('Function for the event dettachment does not exist', 'mbeUnbindEvent', this);
            return;
        }

        events.forEach(function (event, value) {

            var i;

            if (this.bindedEvents[event] && this.bindedEvents[event].length) {
                for (i = 0; i < this.bindedEvents[event].length; i++) {
                    if (this.removeEventListener) {
                        this.removeEventListener(event, this.bindedEvents[event][i], false);
                    } else {
                        this.detachEvent('on' + event, this.bindedEvents[event][i]);
                    }
                }
            }

            if (this.removeEventListener) {
                this.removeEventListener(event, func.bind(thisValue), false);
            } else {
                this.attachEvent('on' + event, func.bind(thisValue));
            }
        }, this);
    };
    Window.prototype.mbeUnbindEvent = Node.prototype.mbeUnbindEvent;

}());
;(function () {

    'use strict';

    /**
     * Merge two objects
     *
     * @param  object a
     * @param  object b
     *
     * @return object
     */
    mbeHelper.mergeObjects = function (a, b) {
        var i;

        for (i in b) {
            if (b.hasOwnProperty(i)) {
                if (typeof b[i] === 'object' && !(b[i] instanceof Element)) {
                    if (!a[i] || typeof a[i] !== 'object') {
                        a[i] = {};
                    }
                    a[i] = mbeHelper.mergeObjects(a[i], b[i]);
                } else {
                    a[i] = b[i];
                }
            }
        }
        return a;
    };

    /**
     * Convert Object to number
     *
     * @param mixed a
     *
     * @return number
     */
    mbeHelper.toNumber = function (x) {
        x = Number(x);

        if (isNaN(x) || !isFinite(x)) {
            x = 0;
        }

        return x;
    };

}());
;(function () {

    /**
     * Set CSS for an element
     *
     * @param  Object obj
     *
     * @return void
     */
    Node.prototype.mbeSetStyle = function (obj) {
        var i;

        for (i in obj) {
            if (obj.hasOwnProperty(i)) {
                this.style.setProperty(i, obj[i]);
            }
        }
    };

    /**
     * Remove the CSS from an element
     *
     * @param  array obj
     *
     * @return void
     */
    Node.prototype.mbeRemoveStyle = function (obj) {
        var i;

        for (i = 0; i < obj.length; i++) {
            this.mbeRemoveSingleStyle(obj[i]);
        }
    };

    /**
     * Remove the single CSS from an element
     *
     * @param  array obj
     *
     * @return void
     */
    Node.prototype.mbeRemoveSingleStyle = function (property) {

        this.style.removeProperty(property);
    };

}());
;(function () {

    /**
     * Make the object animate or stop animating
     *
     * @param  float x
     * @param  float y
     *
     * @return void
     */
    mbeSlider.prototype.setAnimation = function (duration) {

        if (duration > 0) {

            this.element.mbeSetStyle({
                '-webkit-transform-style': 'preserve-3d',
                '-webkit-backface-visibility': 'hidden',
                '-webkit-perspective': 1000,

                '-webkit-transition-property': 'all',
                '-moz-transition-property': '-moz-transform',
                '-o-transition-property': '-o-transform',
                '-ms-transition-property': '-ms-transform',
                'transition-property': 'transform',

                '-webkit-transition-duration': duration + 'ms',
                '-moz-transition-duration': duration + 'ms',
                '-o-transition-duration': duration + 'ms',
                '-ms-transition-duration': duration + 'ms',
                'transition-duration': duration + 'ms',

                '-webkit-transition-timing-function': this.options.transitionTimingFunction,
                '-moz-transition-timing-function': this.options.transitionTimingFunction,
                '-o-transition-timing-function': this.options.transitionTimingFunction,
                '-ms-transition-timing-function': this.options.transitionTimingFunction,
                'transition-timing-function': this.options.transitionTimingFunction
            });
        } else {

            this.element.mbeRemoveStyle(['-webkit-transition-property', '-moz-transition-property', '-o-transition-property', '-ms-transition-property', 'transition-property', '-webkit-transition-duration', '-moz-transition-duration', '-o-transition-duration', '-ms-transition-duration', 'transition-duration', '-webkit-transition-timing-function', '-moz-transition-timing-function', '-o-transition-timing-function', '-ms-transition-timing-function', 'transition-timing-function']);
        }
    };

}());
;(function () {

    /**
     * Init the CSS Function
     *
     * @return void
     */
    mbeSlider.prototype.destroyStyle = function () {
        var i, j,
            elementStyle = this.getElementStyle(),
            slidesStyle = this.getSlidesStyle(),
            parentStyle = this.getParentStyle();

        for (i in elementStyle) {
            if (elementStyle.hasOwnProperty(i)) {
                this.element.mbeRemoveSingleStyle(i);
            }
        }

        for (i in slidesStyle) {
            if (slidesStyle.hasOwnProperty(i)) {
                for (j = 0; j < this._private.slides.length; j++) {
                    this._private.slides[j].element.mbeRemoveSingleStyle(i);
                }
            }
        }

        for (i in parentStyle) {
            if (parentStyle.hasOwnProperty(i)) {
                this.element.parentNode.mbeRemoveSingleStyle(i);
            }
        }
    };

    /**
     * Destroy the Slider HTML Function
     *
     * @return void
     */
    mbeSlider.prototype.destroyHtml = function () {
        if (!this.element.parentNode.classList.contains('mbe-slider')) {
            return;
        }

        var parentNode = this.element.parentNode;
        parentNode.parentNode.insertBefore(this.element, parentNode);
        parentNode.parentNode.removeChild(parentNode);
    };

    /**
     * Destroy the slider
     *
     * @return void
     */
    mbeSlider.prototype.destroy = function () {

        console.time('destroy #' + this.options.id);

        this.destroyStyle();
        this.unbindEvents();
        this.destroyHtml();

        console.timeEnd('destroy #' + this.options.id);
    };

}());
;(function () {

    /**
     * Events On Mouse Up
     *
     * @param  object event
     *
     * @return function
     */
    mbeSlider.prototype.mouseUp = function (event) {

        if (this._private.moved && event.preventDefault) {
            event.preventDefault();
        }

        // Dragging stops
        this._private.mousedown = false;

        // Momentum
        var newX, newY;
        if (this._private.speed.x !== 0) {
            this._private.position.x += this._private.speed.x / 8 * this._private.width;
        }
        if (this._private.speed.y !== 0) {
            this._private.position.y += this._private.speed.y / 8 * this._private.height;
        }

        // Calculate the slides
        var
            slideX = this._private.position.x > 0 ? 0 : Math.round(Math.abs(this._private.position.x) / this._private.width),
            slideY = this._private.position.y > 0 ? 0 : Math.round(Math.abs(this._private.position.y) / this._private.height);

        if (this.options.neverSkip) {
            slideX = this.neverSkip(slideX + 1, 'x');
            slideY = this.neverSkip(slideY + 1, 'y');
        } else {
            slideX ++;
            slideY ++;
        }

        this.gotoSlide(slideX, slideY, this.options.animationDuration);

        /**
         * Bind Custom Event
         */
        if (this.options.onEndDragging && typeof this.options.onEndDragging === 'function') {
            this.options.onEndDragging.call(this);
        }

        return this._private.moved;
    };

}());
;(function () {

    /**
     * Check wether the person is sliding horizontally or vertically
     *
     * @param  object event
     *
     * @return object
     */
    mbeSlider.prototype.isSlidingProperly = function (event) {

        var
            a = this.getMousePosition(event),
            b = this._private.dragStart,
            distX = Math.abs(a.x - b.x),
            distY = Math.abs(a.y - b.y),
            minDist = 10,
            direction;

        if (distX < 10 && distY < 10) {
            return true;
        }

        if (!this._private.currentDirection) {

            if (distX > distY) {
                direction = 'horizontal';
            } else {
                direction = 'vertical';
            }

            this._private.currentDirection = direction;
        }

        return this._private.currentDirection === this.options.direction;
    };

    /**
     * Get the Mouse Position
     *
     * @param  object event
     *
     * @return object
     */
    mbeSlider.prototype.getMousePosition = function (event) {
        var e = event || window.event;

        return {
            x: e.pageX,
            y: e.pageY
        };
    };

    /**
     * Events On Mouse Move
     *
     * @param  object event
     *
     * @return function
     */
    mbeSlider.prototype.mouseMove = function (event) {

        if (this._private.mousedown && this.isSlidingProperly(event)) {

            //console.time('move');

            event.preventDefault();

            var
                move = false,
                pos = this.getMousePosition(event),
                difX = pos.x - this._private.dragMove.x,
                difY = pos.y - this._private.dragMove.y,
                finalX = this._private.position.x + difX,
                finalY = this._private.position.y + difY;

            this._private.speed.x = mbeHelper.toNumber(difX / (Date.now() - this._private.dragStartTime));
            this._private.speed.y = mbeHelper.toNumber(difY / (Date.now() - this._private.dragStartTime));

            if (this.options.direction == 'horizontal' && difX !== 0) {
                move = true;
                finalY = 0;

                if (finalX > 0) {
                    finalX = (pos.x - this._private.dragStart.x) * this.options.pullMargin / 100;
                } else if (finalX < - (this._private.maxSlides - 1) * this._private.width) {
                    finalX = - (this._private.maxSlides - 1) * this._private.width + (pos.x - this._private.dragStart.x) * this.options.pullMargin / 100;
                }

                this._private.speed.y = 0;
            } else if (this.options.direction == 'vertical' && difY !== 0) {
                move = true;
                finalX = 0;

                if (finalY > 0) {
                    finalY = (pos.y - this._private.dragStart.y) * this.options.pullMargin / 100;
                } else if (finalY < - (this._private.maxSlides - 1) * this._private.height) {
                    finalY = - (this._private.maxSlides - 1) * this._private.height + (pos.y - this._private.dragStart.y) * this.options.pullMargin / 100;
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

            //console.timeEnd('move');

            return false;
        }
    };



}());
;(function () {

    /**
     * Events On Mouse Down
     *
     * @param  object event
     *
     * @return function
     */
    mbeSlider.prototype.mouseDown = function (event) {

        if (event.preventDefault) {
            event.preventDefault();
        }

        // Moved mouse
        this._private.moved = false;

        // Get the mouse position
        var pos = this.getMousePosition(event);

        // Remove animaton
        this.setAnimation(0);

        // Dragging starts
        this._private.mousedown = true;

        // For the momentum
        this._private.dragStart.x = pos.x;
        this._private.dragStart.y = pos.y;

        this._private.speed.x = 0;
        this._private.speed.y = 0;

        //reset the direction
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

}());
;(function () {

    /**
     * Bind all the events of the slider
     *
     * @return void
     */
    mbeSlider.prototype.bindEvents = function () {

        if (this.bindedEvents) {
            return;
        }

        this.element.mbeBindEvent(this.getEventName('start'), this.mouseDown, this);
        document.mbeBindEvent(this.getEventName('move'), this.mouseMove, this);
        document.mbeBindEvent(this.getEventName('end'), this.mouseUp, this);
        this.element.mbeBindEvent(this.getEventName('click'), this.click, this);
        window.mbeBindEvent(['resize'], this.resize, this);

        if (this.options.navigation && this.options.navigation.keys) {
            window.mbeBindEvent(['keydown'], this.keyDown, this);
        }

        if (this.options.navigation && this.options.navigation.type && this.options.navigation.clickable) {

            var self = this;

            Array.prototype.forEach.call(this.element.parentNode.querySelector('.' + this.options.navigation.className).childNodes, function (element, index) {

                element.mbeBindEvent(self.getEventName('click'), self.navigationClick, self);
            });
        }

        this.bindedEvents = true;
    };

    /**
     * Unbind all the events from the slider
     *
     * @return void
     */
    mbeSlider.prototype.unbindEvents = function () {

        this.element.mbeUnbindEvent(this.getEventName('start'), this.mouseDown, this);
        document.mbeUnbindEvent(this.getEventName('move'), this.mouseMove, this);
        document.mbeUnbindEvent(this.getEventName('end'), this.mouseUp, this);
        this.element.mbeUnbindEvent(this.getEventName('click'), this.click, this);
        window.mbeUnbindEvent(['resize'], this.resize, this);

        if (this.options.navigation && this.options.navigation.keys) {
            window.mbeUnbindEvent(['keydown'], this.keyDown, this);
        }

        this.bindedEvents = false;
    };

    /**
     * Get the name of the event based on the options and everything
     *
     * @param type String
     *
     * @return function
     */
    mbeSlider.prototype.getEventName = function (type) {

        var events = {
            'start': ['touchstart'],
            'move': ['touchmove'],
            'end': ['touchend'],
            'click': ['click']
        };

        if (this.options.navigation && this.options.navigation.drag) {
            events.start.push('mousedown');
            events.move.push('mousemove');
            events.end.push('mouseup');
        }

        return events[type] || undefined;
    };

}());
;(function () {

    /**
     * Set the element to the slider
     *
     * @return string
     */
    mbeSlider.prototype.setElement = function (element) {
        if (typeof element === 'string') {
            this.element = document.querySelector(element);
        } else {
            this.element = element;
        }

        if (!this.element) {
            mbeHelper.throwError('Element cannot be null', 'setElement', this);
        }
    };

    /**
     * Set the slides of the slider
     *
     * @return string
     */
    mbeSlider.prototype.setSlides = function () {
        var i;

        this._private.slides = [];

        for (i = 0; i < this.element.children.length; i++) {

            this._private.slides.push({
                element: this.element.children[i]
            });
        }
    };

}());
;(function () {

    /**
     * Hide the slider
     *
     * @return string
     */
    mbeSlider.prototype.hide = function () {
        this.element.parentNode.mbeSetStyle({
            'display': 'none'
        });
    };

    /**
     * Show the slider
     *
     * @return string
     */
    mbeSlider.prototype.show = function () {
        this.element.parentNode.mbeSetStyle({
            'display': 'block'
        });
    };


    /**
     * Events On Click
     *
     * @param  object event
     *
     * @return function
     */
    mbeSlider.prototype.click = function (event) {

        if (this._private.moved && event.preventDefault) {
            event.preventDefault();
        }

        return this._private.moved;
    };

    /**
     * Events on resize
     *
     * @return function
     */
    mbeSlider.prototype.resize = function () {

        // Set the width of the slider
        this._private.width = this.element.offsetWidth;
        this._private.height = this.element.offsetHeight;

        this.gotoSlide(this._private.currentSlide.x, this._private.currentSlide.y, false);

        return this._private.moved;
    };

}());
;(function () {

    /**
     * Get the current axe
     *
     * @return void
     */
    mbeSlider.prototype.getCurrentAxe = function () {
        return this.options.direction === 'horizontal' ? 'x' : 'y';
    };

    /**
     * Get the current slide index
     *
     * @return void
     */
    mbeSlider.prototype.getCurrentSlideIndex = function () {
        var axe = this.getCurrentAxe();

        return this._private.currentSlide[axe];
    };

    /**
     * Get the current slide
     *
     * @return void
     */
    mbeSlider.prototype.getCurrentSlide = function () {
        var index = this.getCurrentSlideIndex();

        return this._private.slides[index - 1];
    };

}());
;(function () {

    /**
     * Go to the slide "x"
     *
     * @param  integer x
     * @param  integer y
     * @param  mixed animate
     *
     * @return void
     */
    mbeSlider.prototype.gotoSlide = function (x, y, animate) {

        if (typeof animate === undefined) {
            animate = true;
        }

        // Set the animation to animate
        this.setAnimation(animate === true ? this.options.slideDuration : animate || 0);

        if (typeof x === undefined) {
            x = 0;
        }
        if (typeof y === undefined) {
            y = 0;
        }

        //make it within proportions
        if (x > this._private.maxSlides) {
            x = this._private.maxSlides;
        } else if (x <= 0) {
            x = 1;
        }

        //make it within proportions
        if (y > this._private.maxSlides) {
            y = this._private.maxSlides;
        } else if (y <= 0) {
            y = 1;
        }

        this._private.currentSlide.x = x;
        this._private.currentSlide.y = y;

        this.moveTo(- (x - 1) * this._private.width, - (y - 1) * this._private.height);

        //set the navigation item as selected
        this.setNavigationItem();

        //set the navigation arrows
        this.setNavigationArrows();

        /**
         * Init Event
         */
        if (this.options.afterSlide && typeof this.options.afterSlide === 'function') {

            this.options.afterSlide.call(this, this.getCurrentSlideIndex(), this.getCurrentSlide());
        }
    };


    /**
     * Go to the next slide
     *
     * @param  mixed animate
     *
     * @return void
     */
    mbeSlider.prototype.gotoNextSlide = function (animate) {

        var current = {
            x: this._private.currentSlide.x,
            y: this._private.currentSlide.y
        };

        if (this.options.direction === 'horizontal') {
            current.x ++;
        } else {
            current.y ++;
        }

        this.gotoSlide(current.x, current.y, animate);
    };


    /**
     * Go to the previous slide
     *
     * @param  mixed animate
     *
     * @return void
     */
    mbeSlider.prototype.gotoPreviousSlide = function (animate) {

        var current = {
            x: this._private.currentSlide.x,
            y: this._private.currentSlide.y
        };

        if (this.options.direction === 'horizontal') {
            current.x --;
        } else {
            current.y --;
        }

        this.gotoSlide(current.x, current.y, animate);
    };

}());
;(function () {

    /**
     * Set the parent data to the node data
     *
     * @return void
     */
    mbeSlider.prototype.setData = function () {

        var i;

        for (i in this.element.dataset) {
            if (this.element.dataset.hasOwnProperty(i)) {
                this.element.parentNode.dataset[i] = this.element.dataset[i];
            }
        }
    };

    /**
     * Init the CSS Function
     *
     * @return void
     */
    mbeSlider.prototype.initStyle = function () {
        var i,
            elementStyle = this.getElementStyle(),
            slidesStyle = this.getSlidesStyle(),
            parentStyle = this.getParentStyle();

        this.element.mbeSetStyle(elementStyle);

        for (i = 0; i < this._private.slides.length; i++) {
            this._private.slides[i].element.mbeSetStyle(slidesStyle);
        }

        this.element.parentNode.mbeSetStyle(parentStyle);
    };

    /**
     * Init the HTML Function
     *
     * @return void
     */
    mbeSlider.prototype.initHtml = function () {
        if (this.element.parentNode.classList.contains('mbe-slider')) {
            return;
        }

        // Create the element
        var
            wrapper = document.createElement('div'),
            clone = this.element.cloneNode(true);

        // Add The parent class
        wrapper.classList.add('mbe-slider');

        // Add the classes from the element to the wrappoer
        Array.prototype.forEach.call(this.element.classList, function (cssClass, index) {
            wrapper.classList.add(cssClass);
        }, this);

        // Make the element to be the parent
        wrapper.appendChild(clone);
        this.element.parentNode.replaceChild(wrapper, this.element);

        // Refetch the element
        this.setElement(clone);
    };

    /**
     * Init the Slider
     *
     * @return mbeSlider
     */
    mbeSlider.prototype.init = function () {

        console.time('init #' + this.options.id);

        //set the main element
        this.setElement(this.options.element);

        // Remove the White Space
        this.element.mbeRmoveWhiteSpace();

        //init the html
        this.initHtml();

        //set the slides
        this.setSlides();

        // Init the CSS
        this.initStyle();

        // Set the width of the slider
        this._private.width = this.element.offsetWidth;
        this._private.height = this.element.offsetHeight;

        //get the number of slides
        this._private.maxSlides = this.element.childNodes.length;
        this._private.currentSlide.x = 1;
        this._private.currentSlide.y = 1;

        //append arrows
        this.appendArrows();

        //append navigation
        this.appendNavigation();

        //set the data to the parent
        this.setData();

        //bind the events
        this.bindEvents();

        /**
         * Init Event
         */
        if (this.options.onInit && typeof this.options.onInit === 'function') {
            this.options.onInit.call(this);
        }

        console.timeEnd('init #' + this.options.id);

        return this;
    };

}());
;(function () {

    /**
     * Events on key down
     *
     * @return function
     */
    mbeSlider.prototype.keyDown = function (event) {

        var code = event.keyCode || event.which;

        if (this.options.direction === 'horizontal') {
            if (code == 39) { //right
                event.preventDefault();
                this.gotoNextSlide(true);
            } else if (code == 37) { //left
                event.preventDefault();
                this.gotoPreviousSlide(true);
            }
        } else {
            if (code == 40) { //up
                event.preventDefault();
                this.gotoNextSlide(true);
            } else if (code == 38) { //down
                event.preventDefault();
                this.gotoPreviousSlide(true);
            }
        }
    };

}());
;(function () {

    /**
     * Move the object to a certain point
     *
     * @param  float x
     * @param  float y
     *
     * @return void
     */
    mbeSlider.prototype.moveTo = function (x, y) {

        if (this.options.direction == 'horizontal') {
            y = 0;
        } else if (this.options.direction == 'vertical') {
            x = 0;
        }

        this._private.position.x = mbeHelper.toNumber(x);
        this._private.position.y = mbeHelper.toNumber(y);

        this.element.mbeSetStyle({
            '-webkit-transform': 'translate(' + x + 'px, ' + y + 'px)',
            '-moz-transform': 'translate(' + x + 'px, ' + y + 'px)',
            '-o-transform': 'translate(' + x + 'px, ' + y + 'px)',
            '-ms-transform': 'translate(' + x + 'px, ' + y + 'px)',
            'transform': 'translate(' + x + 'px, ' + y + 'px)'
        });

    };

}());
;(function () {

    /**
     * Append the arrows
     *
     * @return void
     */
    mbeSlider.prototype.appendArrows = function () {

        if (!(this.options.navigation && this.options.navigation.arrows)) {
            return;
        }

        //setup the back arrow
        var arrowBack = document.createElement('a');
        arrowBack.classList.add('mbe-arrow-back');
        arrowBack.setAttribute('href', '#go-back');
        arrowBack.mbeBindEvent(this.getEventName('click'), this.arrowBackClick, this);


        //setup the forward arrow
        var arrowForward = document.createElement('a');
        arrowForward.classList.add('mbe-arrow-forward');
        arrowForward.setAttribute('href', '#go-forward');
        arrowForward.mbeBindEvent(this.getEventName('click'), this.arrowForwardClick, this);

        //setup the container for the arrows
        var navigation = document.createElement('div');
        navigation.classList.add('mbe-navigation-arrows');
        navigation.appendChild(arrowBack);
        navigation.appendChild(arrowForward);

        //append everything to the parent
        this.element.parentNode.appendChild(navigation);

        //set the navigation arrows
        this.setNavigationArrows();
    };


    /**
     * Go Back arrow click
     *
     * @return void
     */
    mbeSlider.prototype.arrowBackClick = function (e) {

        e.preventDefault();

        this.gotoPreviousSlide(true);
    };


    /**
     * Go Forward arrow click
     *
     * @return void
     */
    mbeSlider.prototype.arrowForwardClick = function (e) {

        e.preventDefault();

        this.gotoNextSlide(true);
    };


    /**
     * Set the navigation arrows
     *
     * @return void
     */
    mbeSlider.prototype.setNavigationArrows = function () {

        if (!(this.options.navigation && this.options.navigation.arrows)) {
            return;
        }

        var
            currentSlide = this.getCurrentSlideIndex(),
            arrowBack = this.element.parentNode.querySelector('.mbe-arrow-back'),
            arrowForward = this.element.parentNode.querySelector('.mbe-arrow-forward');

        if (currentSlide <= 1) { //first
            arrowBack.classList.add('hidden');
        } else {
            arrowBack.classList.remove('hidden');
        }

        if (currentSlide >= this._private.maxSlides) { //last
            arrowForward.classList.add('hidden');
        } else {
            arrowForward.classList.remove('hidden');
        }
    };

}());
;(function () {

    /**
     * Append navigation
     *
     * @return void
     */
    mbeSlider.prototype.appendNavigation = function () {

        if (!(this.options.navigation && this.options.navigation.type)) {
            return;
        }

        //make to lower case
        this.options.navigation.type = this.options.navigation.type.toLowerCase();

        //make sure the type is allowed
        if ([ 'bullets', 'thumbs' ].indexOf(this.options.navigation.type) < 0) {
            this.options.navigation.type = 'bullets';
        }

        //create the navigation
        var
            navigation = document.createElement('div'),
            navigationClass = this.options.navigation.className;

        //add the class to navigation
        navigation.classList.add(navigationClass);
        navigation.classList.add(navigationClass + '-' + this.options.navigation.type);

        //add all elements
        this._private.slides.forEach(function (element, index) {
            var navigationItem = document.createElement('div');

            //add the classes
            navigationItem.classList.add(navigationClass + '-item');
            navigationItem.classList.add(navigationClass + '-item-' + index);

            //add the selected class to the first element
            if (index === 0) {
                navigationItem.classList.add(navigationClass + '-item-selected');
            }

            //append an image if they are thumbs
            if (this.options.navigation.type === 'thumbs' && element.dataset && element.dataset.thumb) {
                //create the image
                var img = document.createElement('img');

                //set the source
                img.src = element.dataset.thumb;

                //append the image
                navigationItem.appendChild(img);
            }

            //set the slide in the dataset
            navigationItem.dataset.slide = index + 1;

            //append the item
            navigation.appendChild(navigationItem);
        }, this);

        this.element.parentNode.appendChild(navigation);

        //set the navigation item as selected
        this.setNavigationItem();
    };

    /**
     * What happens when you click on an item
     *
     * @return void
     */
    mbeSlider.prototype.navigationClick = function (event) {
        event.preventDefault();

        var slide = event.currentTarget.dataset.slide;

        if (this.options.direction === 'horizontal') {
            this.gotoSlide(slide, 1, true);
        } else {
            this.gotoSlide(1, slide, true);
        }
    };

    /**
     * Set the navigation item
     *
     * @return void
     */
    mbeSlider.prototype.setNavigationItem = function () {

        if (!(this.options.navigation && this.options.navigation.type)) {
            return;
        }

        var
            currentSlide = this.getCurrentSlideIndex(),
            navigationClass = this.options.navigation.className,
            navigationItems = this.element.parentNode.querySelector('.' + navigationClass).childNodes;

        Array.prototype.forEach.call(navigationItems, function (element, index) {

            element.classList.remove(navigationClass + '-item-selected');

            if (index === currentSlide - 1) {
                element.classList.add(navigationClass + '-item-selected');
            }
        });
    };

}());
;(function () {

    /**
     * Never skip a frame
     *
     * @param  int slide
     * @param  string axis
     *
     * @return object
     */
    mbeSlider.prototype.neverSkip = function (slide, axis) {

        if (axis.toLowerCase() === 'x' && this.options.direction === 'horizontal') {
            if (slide > this._private.currentSlide.x + 1) {

                return this._private.currentSlide.x + 1;
            } else if (slide < this._private.currentSlide.x - 1) {
                return this._private.currentSlide.x - 1;
            }
        } else if (axis.toLowerCase() === 'y' && this.options.direction === 'vertical') {
            if (slide > this._private.currentSlide.y + 1) {

                return this._private.currentSlide.y + 1;
            } else if (slide < this._private.currentSlide.y - 1) {
                return this._private.currentSlide.y - 1;
            }
        }

        return slide;
    };

}());
;(function () {

    /**
     * Refreshes the slider slides
     *
     * @return string
     */
    mbeSlider.prototype.refreshSlides = function () {

        this.destroyStyle();
        this.setSlides();
        this.initStyle();
    };

}());
;/*jshint sub:true*/
(function () {

    /**
     * Get the style of the element
     *
     * @return void
     */
    mbeSlider.prototype.getElementStyle = function () {
        var elementStyle = {
            'list-style': 'none',
            'margin': '0',
            'padding': '0'
        };

        switch (this.options.direction) {
            case 'horizontal':
                elementStyle['white-space'] = 'nowrap';
                break;

            case 'vertical':
                elementStyle['height'] = '100%';
                break;
        }

        return elementStyle;
    };

    /**
     * Get the style of the slides
     *
     * @return void
     */
    mbeSlider.prototype.getSlidesStyle = function () {
        var slidesStyle = {
            'margin': '0',
            'padding': '0',
            'height': '100%'
        };

        if (this.options.direction === 'horizontal') {
            slidesStyle['display'] = 'inline-block';
            slidesStyle['width'] = '100%';
        } else {
            slidesStyle['display'] = 'block';
            slidesStyle['width'] = 'auto';
        }

        return slidesStyle;
    };

    /**
     * Get the style of the parent
     *
     * @return void
     */
    mbeSlider.prototype.getParentStyle = function () {
        var parentStyle = {
            'overflow': 'hidden'
        };

        if (this.options.direction === 'vertical') {
            parentStyle['height'] = '100%';
        }

        return parentStyle;
    };

}());
