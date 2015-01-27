(function (MbeSlider) {

    'use strict';

    /**
     * Autoslide the slider (if it's the case)
     *
     * @return function
     */
    MbeSlider.prototype.autoSlide = function () {

        //autoslide
        if (this.options.autoSlide) {
            window.setTimeout(this.gotoNextSlide.bind(this, true), this.options.autoSlide || 3000);
        }
    };

}(MbeSlider));



