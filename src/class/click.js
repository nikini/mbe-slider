(function (MbeSlider) {

    'use strict';


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
            event.stopPropagation();
        }

        return this._private.moved;
    };

}(MbeSlider));
