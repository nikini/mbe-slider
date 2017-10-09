export default {
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
        keys: false,
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
    transitionTimingFunction: 'cubic-bezier(0.33, 0.66, 0.66, 1)',
};
