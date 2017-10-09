import Slider from '../slider';

Slider.prototype.setElement = function setElement(element) {
    if (typeof element === 'string') {
        this.element = document.querySelector(element);
    } else {
        this.element = element;
    }

    if (!this.element) {
        throw new Error('Element cannot be found or is null');
    }
};
