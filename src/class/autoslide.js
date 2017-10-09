import Slider from '../slider';

/**
 * Autoslide the slider (if it's the case)
 */
Slider.prototype.autoSlide = function autoSlide() {
    if (!this.options.autoSlide) {
        return;
    }
    let duration;

    if (this.options.autoSlide === true) {
        duration = 3000;
    } else {
        duration = this.options.autoSlide;
    }

    this.stopAutoSlide();

    if (this.options.autoSlideDirection === 'next') {
        this.autoSlideTimeout = window.setTimeout(this.gotoNextSlide.bind(this), duration);
    } else {
        this.autoSlideTimeout = window.setTimeout(this.gotoPreviousSlide.bind(this), duration);
    }
};

/**
 * Stop the autoslide
 *
 * @return {Function}
 */
Slider.prototype.stopAutoSlide = function stopAutoSlide() {
    if (this.autoSlideTimeout) {
        window.clearTimeout(this.autoSlideTimeout);
    }
};
