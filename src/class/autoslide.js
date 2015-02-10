(function (MbeSlider) {

    'use strict';

    /**
     * Autoslide the slider (if it's the case)
     *
     * @return function
     */
    MbeSlider.prototype.autoSlide = function () {
        var duration;

        //autoslide
        if (this.options.autoSlide) {

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
        }
    };

    /**
     * Stop the autoslide
     *
     * @return function
     */
    MbeSlider.prototype.stopAutoSlide = function () {
        if (this.autoSlideTimeout) {
            window.clearTimeout(this.autoSlideTimeout);
        }
    };

}(MbeSlider));



