import Slider from '../slider';

/**
 * When the dragging starts
 *
 * @param  {Event} event
 *
 * @return {Boolean}
 */
Slider.prototype.mouseDown = function mouseDown(event) {
    if (event.which === 1 && event.preventDefault) {
        event.preventDefault();
    }

    // Moved mouse
    this._private.moved = false;

    // Get the mouse position
    const pos = this.getMousePosition(event);

    // Remove animaton
    this.setAnimation(0);

    // Dragging starts
    this._private.mousedown = true;

    // For the momentum
    this._private.dragStart.x = pos.x;
    this._private.dragStart.y = pos.y;

    this._private.speed.x = 0;
    this._private.speed.y = 0;

    // Reset the direction
    this._private.currentDirection = 0;

    this._private.dragStartTime = Date.now();

    // For the dragging
    this._private.dragMove.x = pos.x;
    this._private.dragMove.y = pos.y;

    /**
     * Bind Custom Event
     */
    if (this.options.onStartDragging && typeof this.options.onStartDragging === 'function') {
        this.options.onStartDragging.call(this);
    }

    return false;
};
