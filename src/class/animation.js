(function (MbeSlider, mbeHelper) {

    'use strict';

    /**
     * Make the object animate or stop animating
     *
     * @param  float x
     * @param  float y
     *
     * @return void
     */
    MbeSlider.prototype.setAnimation = function (duration) {

        if (duration > 0) {

            mbeHelper.setStyle(this.element, {
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

            mbeHelper.removeStyle(this.element, ['-webkit-transition-property', '-moz-transition-property', '-o-transition-property', '-ms-transition-property', 'transition-property', '-webkit-transition-duration', '-moz-transition-duration', '-o-transition-duration', '-ms-transition-duration', 'transition-duration', '-webkit-transition-timing-function', '-moz-transition-timing-function', '-o-transition-timing-function', '-ms-transition-timing-function', 'transition-timing-function']);
        }
    };

}(MbeSlider, mbeHelper));
