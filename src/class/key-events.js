(function (MbeSlider) {

    'use strict';

    /**
     * Events on key down
     *
     * @return function
     */
    MbeSlider.prototype.keyDown = function (event) {

        var code = event.keyCode || event.which;

        if (this.options.direction === 'horizontal') {
            if (code === 39) { //right
                event.preventDefault();
                this.gotoNextSlide(true);
            } else if (code === 37) { //left
                event.preventDefault();
                this.gotoPreviousSlide(true);
            }
        } else {
            if (code === 40) { //up
                event.preventDefault();
                this.gotoNextSlide(true);
            } else if (code === 38) { //down
                event.preventDefault();
                this.gotoPreviousSlide(true);
            }
        }
    };

}(MbeSlider));
