import Slider from '../slider';

/**
 * Refreshes the slider slides
 */
Slider.prototype.refreshSlides = function refreshSlides() {
    this.destroyStyle();
    this.setSlides();
    this.initStyle();
};
