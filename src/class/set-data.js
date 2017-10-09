import Slider from '../slider';

/**
 * Set the parent data to the node data
 */
Slider.prototype.setData = function setData() {
    // Not using dataset because of IE's lack of support
    Array.prototype.forEach.call(this.element.attributes, (attribute) => {
        if (/^data-/i.test(attribute.name)) { // Is a data attribute
            this.element.parentNode.setAttribute(attribute.name, attribute.value);
        }
    }, this);
};
