(function (MbeSlider, mbeHelper) {

    'use strict';

    /**
     * Hide the slider
     *
     * @return string
     */
    MbeSlider.prototype.hide = function () {
        mbeHelper.setStyle(this.element.parentNode, {
            'display': 'none'
        });
    };

    /**
     * Show the slider
     *
     * @return string
     */
    MbeSlider.prototype.show = function () {
        mbeHelper.setStyle(this.element.parentNode, {
            'display': 'block'
        });
    };

    /**
     * Events on resize
     *
     * @return function
     */
    MbeSlider.prototype.resize = function () {

        // Set the width of the slider
        this._private.width = this.element.offsetWidth;
        this._private.height = this.element.offsetHeight;

        this.gotoSlide(this._private.currentSlide.x, this._private.currentSlide.y, false);

        return this._private.moved;
    };

}(MbeSlider, mbeHelper));
