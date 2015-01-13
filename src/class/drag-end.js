(function (MbeSlider) {

    'use strict';

    /**
     * Events On Mouse Up
     *
     * @param  object event
     *
     * @return function
     */
    MbeSlider.prototype.mouseUp = function (event) {

        if (this._private.moved && event.preventDefault) {
            event.preventDefault();
        }

        // Dragging stops
        this._private.mousedown = false;

        // Momentum
        if (this._private.speed.x !== 0) {
            this._private.position.x += this._private.speed.x / 8 * this._private.width;
        }
        if (this._private.speed.y !== 0) {
            this._private.position.y += this._private.speed.y / 8 * this._private.height;
        }

        // Calculate the slides
        var
            slideX = this._private.position.x > 0 ? 0 : Math.round(Math.abs(this._private.position.x) / this._private.width),
            slideY = this._private.position.y > 0 ? 0 : Math.round(Math.abs(this._private.position.y) / this._private.height);

        if (this.options.neverSkip) {
            slideX = this.neverSkip(slideX + 1, 'x');
            slideY = this.neverSkip(slideY + 1, 'y');
        } else {
            slideX++;
            slideY++;
        }

        this.gotoSlide(slideX, slideY, this.options.animationDuration);

        /**
         * Bind Custom Event
         */
        if (this._private.moved && this.options.onEndDragging && typeof this.options.onEndDragging === 'function') {
            this.options.onEndDragging.call(this);
        }

        return !this._private.moved;
    };

}(MbeSlider));
