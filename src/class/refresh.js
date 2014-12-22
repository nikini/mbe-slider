(function (MbeSlider) {

    'use strict';

    /**
     * Refreshes the slider slides
     *
     * @return string
     */
    MbeSlider.prototype.refreshSlides = function () {

        this.destroyStyle();
        this.setSlides();
        this.initStyle();
    };

}(MbeSlider));
