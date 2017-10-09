import Slider from '../slider';
import toNumber from '../helpers/to-number';
import styler from '../helpers/styler';

/**
 * Move the object to a certain point
 *
 * @param  {Number} x
 * @param  {Number} y
 */
Slider.prototype.moveTo = function moveTo(x = 0, y = 0) {
    if (this.options.direction === 'horizontal') {
        y = 0;
    } else if (this.options.direction === 'vertical') {
        x = 0;
    }

    this._private.position.x = toNumber(x);
    this._private.position.y = toNumber(y);

    styler.set(this.element, {
        '-webkit-transform': `translate(${x}px, ${y}px)`,
        '-moz-transform': `translate(${x}px, ${y}px)`,
        '-o-transform': `translate(${x}px, ${y}px)`,
        '-ms-transform': `translate(${x}px, ${y}px)`,
        transform: `translate(${x}px, ${y}px)`,
    });
};
