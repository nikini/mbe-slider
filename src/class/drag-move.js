import Slider from '../slider';
import toNumber from '../helpers/to-number';

/**
 * When the dragging moves
 *
 * @param  {Event} event
 *
 * @return {Boolean}
 */
Slider.prototype.mouseMove = function mouseMove(event) {
    if (!this._private.mousedown || !this.slidingProperly(event)) {
        return true;
    }

    // console.time('move');

    event.preventDefault();

    let move = false;

    const pos = this.getMousePosition(event);
    const difX = pos.x - this._private.dragMove.x;
    const difY = pos.y - this._private.dragMove.y;
    let finalX = this._private.position.x + difX;
    let finalY = this._private.position.y + difY;

    this._private.speed.x = toNumber(difX / (Date.now() - this._private.dragStartTime));
    this._private.speed.y = toNumber(difY / (Date.now() - this._private.dragStartTime));

    if (this.options.direction === 'horizontal' && difX !== 0) {
        move = true;
        finalY = 0;

        if (finalX > 0) {
            finalX = (pos.x - this._private.dragStart.x) * (this.options.pullMargin / 100);
        } else if (finalX < -(this._private.totalSlides - 1) * this._private.width) {
            finalX = -((this._private.totalSlides - 1) * this._private.width) + ((pos.x - this._private.dragStart.x) * (this.options.pullMargin / 100));
        }

        this._private.speed.y = 0;
    } else if (this.options.direction === 'vertical' && difY !== 0) {
        move = true;
        finalX = 0;

        if (finalY > 0) {
            finalY = (pos.y - this._private.dragStart.y) * (this.options.pullMargin / 100);
        } else if (finalY < -(this._private.totalSlides - 1) * this._private.height) {
            finalY = -((this._private.totalSlides - 1) * this._private.height) + ((pos.y - this._private.dragStart.y) * (this.options.pullMargin / 100));
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

    // console.timeEnd('move');

    return false;
};
