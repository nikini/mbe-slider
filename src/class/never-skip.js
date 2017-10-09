import Slider from '../slider';

/**
 * Never skip a frame
 *
 * @param  {Number} slide
 * @param  {string} axis
 *
 * @return {Object}
 */
Slider.prototype.neverSkip = function neverSkip(slide, axis) {
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
