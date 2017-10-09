import Slider from '../slider';
import styler from '../helpers/styler';

/**
 * Hide the slider
 */
Slider.prototype.hide = function hide() {
    styler.set(this.element.parentNode, {
        display: 'none',
    });
};

/**
 * Show the slider
 */
Slider.prototype.show = function show() {
    styler.set(this.element.parentNode, {
        display: 'block',
    });
};
