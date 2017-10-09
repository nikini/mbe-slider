import defaultOptions from 'config/options';

window.CipSlider = class {
    constructor(options) {
        /**
         * Cip Slider Options
         *
         * @type {[type]}
         */
        this.options = Object.assign(defaultOptions, options);

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
                y: 0,
            },
            moved: false,
            bindedEvents: false,

            width: 0,
            height: 0,

            maxSlides: 0,
            currentSlide: {
                x: 0,
                y: 0,
            },

            dragStart: {
                x: 0,
                y: 0,
            },
            dragMove: {
                x: 0,
                y: 0,
            },
            speed: {
                x: 0,
                y: 0,
            },
            dragStartTime: 0,
            currentDirection: '',
        };

        /**
         * Initialize the slider
         */
        this.initialize();
    }
};

export default window.CipSlider;

function requireAll(r) {
    r.keys().forEach(r);
}
requireAll(require.context('./class/', true, /\.js$/));
