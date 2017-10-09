import Slider from '../slider';

/**
 * Events on resize
 */
Slider.prototype.resize = function resize() {
    // Set the width of the slider
    this._private.width = this.element.offsetWidth;
    this._private.height = this.element.offsetHeight;

    // Move to the current slide
    this.gotoSlide(this._private.currentSlide.x, this._private.currentSlide.y, false);

    return this._private.moved;
};
