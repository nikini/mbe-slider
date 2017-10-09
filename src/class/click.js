import Slider from '../slider';

/**
 * Events On Click
 *
 * @param  {Event} event
 *
 * @return {Boolean}
 */
Slider.prototype.click = function click(event) {
    if (this._private.moved && event.preventDefault) {
        event.preventDefault();
        event.stopPropagation();
    }

    return this._private.moved;
};
