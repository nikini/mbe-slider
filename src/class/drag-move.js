(function (MbeSlider, mbeHelper) {

    'use strict';

    /**
     * Check wether the person is sliding horizontally or vertically
     *
     * @param  object event
     *
     * @return object
     */
    MbeSlider.prototype.isSlidingProperly = function (event) {

        var
            a = this.getMousePosition(event),
            b = this._private.dragStart,
            distX = Math.abs(a.x - b.x),
            distY = Math.abs(a.y - b.y),
            direction;

        if (distX < 10 && distY < 10) {
            return true;
        }

        if (!this._private.currentDirection) {

            if (distX > distY) {
                direction = 'horizontal';
            } else {
                direction = 'vertical';
            }

            this._private.currentDirection = direction;
        }

        return this._private.currentDirection === this.options.direction;
    };

    /**
     * Get the Mouse Position
     *
     * @param  object event
     *
     * @return object
     */
    MbeSlider.prototype.getMousePosition = function (event) {
        var e = event || window.event;

        return {
            x: e.pageX,
            y: e.pageY
        };
    };

    /**
     * Events On Mouse Move
     *
     * @param  object event
     *
     * @return function
     */
    MbeSlider.prototype.mouseMove = function (event) {

        if (this._private.mousedown && this.isSlidingProperly(event)) {

            //console.time('move');

            event.preventDefault();

            var
                move = false,
                pos = this.getMousePosition(event),
                difX = pos.x - this._private.dragMove.x,
                difY = pos.y - this._private.dragMove.y,
                finalX = this._private.position.x + difX,
                finalY = this._private.position.y + difY;

            this._private.speed.x = mbeHelper.toNumber(difX / (Date.now() - this._private.dragStartTime));
            this._private.speed.y = mbeHelper.toNumber(difY / (Date.now() - this._private.dragStartTime));

            if (this.options.direction === 'horizontal' && difX !== 0) {
                move = true;
                finalY = 0;

                if (finalX > 0) {
                    finalX = (pos.x - this._private.dragStart.x) * this.options.pullMargin / 100;
                } else if (finalX < -(this._private.totalSlides - 1) * this._private.width) {
                    finalX = -(this._private.totalSlides - 1) * this._private.width + (pos.x - this._private.dragStart.x) * this.options.pullMargin / 100;
                }

                this._private.speed.y = 0;
            } else if (this.options.direction === 'vertical' && difY !== 0) {
                move = true;
                finalX = 0;

                if (finalY > 0) {
                    finalY = (pos.y - this._private.dragStart.y) * this.options.pullMargin / 100;
                } else if (finalY < -(this._private.totalSlides - 1) * this._private.height) {
                    finalY = -(this._private.totalSlides - 1) * this._private.height + (pos.y - this._private.dragStart.y) * this.options.pullMargin / 100;
                }

                this._private.speed.x = 0;
            }

            if (move) {

                this._private.moved = true;
                this.moveTo(finalX, finalY);
            }

            this._private.dragStartTime = Date.now();

            this._private.dragMove.x = pos.x;
            this._private.dragMove.y = pos.y;

            /**
             * Bind Custom Event
             */
            if (this.options.onDragging && typeof this.options.onDragging === 'function') {
                this.options.onDragging.call(this);
            }

            //console.timeEnd('move');

            return false;
        }
    };



}(MbeSlider, mbeHelper));
