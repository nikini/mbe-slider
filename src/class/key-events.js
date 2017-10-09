import Slider from '../slider';

/**
 * Events on key down
 */
Slider.prototype.keyDown = function keyDown(event) {
    const code = event.keyCode || event.which;
    if (this.options.direction === 'horizontal') {
        if (code === 39) { // Right
            event.preventDefault();
            this.gotoNextSlide(true);
        } else if (code === 37) { // Left
            event.preventDefault();
            this.gotoPreviousSlide(true);
        }
    } else {
        if (code === 40) { // Up
            event.preventDefault();
            this.gotoNextSlide(true);
        } else if (code === 38) { // Down
            event.preventDefault();
            this.gotoPreviousSlide(true);
        }
    }
};
