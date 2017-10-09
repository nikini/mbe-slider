import Slider from '../slider';

/**
 * Get the Mouse Position
 *
 * @param  {Event} event
 */
Slider.prototype.getMousePosition = function getMousePosition(event) {
    const e = event || window.event;

    return {
        x: e.pageX,
        y: e.pageY,
    };
};
