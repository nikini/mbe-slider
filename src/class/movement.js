(function (MbeSlider, mbeHelper) {

    'use strict';

    /**
     * Move the object to a certain point
     *
     * @param  float x
     * @param  float y
     *
     * @return void
     */
    MbeSlider.prototype.moveTo = function (x, y) {

        if (this.options.direction === 'horizontal') {
            y = 0;
        } else if (this.options.direction === 'vertical') {
            x = 0;
        }

        this._private.position.x = mbeHelper.toNumber(x);
        this._private.position.y = mbeHelper.toNumber(y);

        this.element.mbeSetStyle({
            '-webkit-transform': 'translate(' + x + 'px, ' + y + 'px)',
            '-moz-transform': 'translate(' + x + 'px, ' + y + 'px)',
            '-o-transform': 'translate(' + x + 'px, ' + y + 'px)',
            '-ms-transform': 'translate(' + x + 'px, ' + y + 'px)',
            'transform': 'translate(' + x + 'px, ' + y + 'px)'
        });

    };

}(MbeSlider, mbeHelper));
