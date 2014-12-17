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
