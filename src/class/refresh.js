(function () {

    /**
     * Refreshes the slider slides
     *
     * @return string
     */
    mbeSlider.prototype.refreshSlides = function () {

        this.destroyStyle();
        this.setSlides();
        this.initStyle();
    };

}());
