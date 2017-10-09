import Slider from '../slider';

/**
 * Check wether the person is sliding horizontally or vertically
 *
 * @param  {Event} event
 *
 * @return {Boolean}
 */
Slider.prototype.slidingProperly = function slidingProperly(event) {
    const a = this.getMousePosition(event);
    const b = this._private.dragStart;
    const distX = Math.abs(a.x - b.x);
    const distY = Math.abs(a.y - b.y);

    if (distX < 10 && distY < 10) {
        return true;
    }

    if (!this._private.currentDirection) {
        this._private.currentDirection = distX > distY ? 'horizontal' : 'vertical';
    }

    return this._private.currentDirection === this.options.direction;
};
