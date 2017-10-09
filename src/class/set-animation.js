import Slider from '../slider';
import styler from '../helpers/styler';

/**
 * Set the animation to the slider
 *
 * @param {number} duration
 */
Slider.prototype.setAnimation = function setAnimation(duration) {
    if (duration > 0) {
        styler.set(this.element, {
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
            'transition-timing-function': this.options.transitionTimingFunction,
        });
    } else {
        styler.remove(this.element, [
            '-webkit-transition-property',
            '-moz-transition-property',
            '-o-transition-property',
            '-ms-transition-property',
            'transition-property',
            '-webkit-transition-duration',
            '-moz-transition-duration',
            '-o-transition-duration',
            '-ms-transition-duration',
            'transition-duration',
            '-webkit-transition-timing-function',
            '-moz-transition-timing-function',
            '-o-transition-timing-function',
            '-ms-transition-timing-function',
            'transition-timing-function',
        ]);
    }
};
