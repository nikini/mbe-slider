import Slider from '../slider';

/**
 * Get the current axe
 *
 * @return {string}
 */
Slider.prototype.getCurrentAxe = function getCurrentAxe() {
    return this.options.direction === 'horizontal' ? 'x' : 'y';
};

/**
 * Get the current slide index
 *
 * @return {number}
 */
Slider.prototype.getCurrentSlideIndex = function getCurrentSlideIndex() {
    const axe = this.getCurrentAxe();
    return this._private.currentSlide[axe];
};

/**
 * Get the current slide
 *
 * @return {Slide}
 */
Slider.prototype.getCurrentSlide = function getCurrentSlide() {
    const index = this.getCurrentSlideIndex();
    return this._private.slides[index - 1];
};
