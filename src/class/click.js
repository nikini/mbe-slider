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

    	console.log(this._private.moved);

        if (this._private.moved && event.preventDefault) {
            event.preventDefault();
        }

        return this._private.moved;
    };

}(MbeSlider));
