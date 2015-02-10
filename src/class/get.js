(function (MbeSlider) {

    'use strict';

    /**
     * Get the current axe
     *
     * @return void
     */
    MbeSlider.prototype.getCurrentAxe = function () {
        return this.options.direction === 'horizontal' ? 'x' : 'y';
    };

    /**
     * Get the current slide index
     *
     * @return void
     */
    MbeSlider.prototype.getCurrentSlideIndex = function () {
        var axe = this.getCurrentAxe();
        var index = this._private.currentSlide[axe];

        return index;
    };

    /**
     * Get the current slide
     *
     * @return void
     */
    MbeSlider.prototype.getCurrentSlide = function () {
        var index = this.getCurrentSlideIndex();

        return this._private.slides[index - 1];
    };

}(MbeSlider));
