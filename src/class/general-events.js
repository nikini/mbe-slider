(function (MbeSlider) {

    'use strict';

    /**
     * Hide the slider
     *
     * @return string
     */
    MbeSlider.prototype.hide = function () {
        this.element.parentNode.mbeSetStyle({
            'display': 'none'
        });
    };

    /**
     * Show the slider
     *
     * @return string
     */
    MbeSlider.prototype.show = function () {
        this.element.parentNode.mbeSetStyle({
            'display': 'block'
        });
    };


    /**
     * Events On Click
     *
     * @param  object event
     *
     * @return function
     */
    MbeSlider.prototype.click = function (event) {

        if (this._private.moved && event.preventDefault) {
            event.preventDefault();
        }

        return this._private.moved;
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

}(MbeSlider));
