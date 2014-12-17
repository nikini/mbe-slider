(function () {

    /**
     * Get the current axe
     *
     * @return void
     */
    mbeSlider.prototype.getCurrentAxe = function () {
        return this.options.direction === 'horizontal' ? 'x' : 'y';
    };

    /**
     * Get the current slide index
     *
     * @return void
     */
    mbeSlider.prototype.getCurrentSlideIndex = function () {
        var axe = this.getCurrentAxe();

        return this._private.currentSlide[axe];
    };

    /**
     * Get the current slide
     *
     * @return void
     */
    mbeSlider.prototype.getCurrentSlide = function () {
        var index = this.getCurrentSlideIndex();

        return this._private.slides[index - 1];
    };

}());
