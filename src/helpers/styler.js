export default {
    /**
     * Set the style for an element
     *
     * @param {HTMLElement} element
     * @param {Object} styleObject
     */
    set(element, styleObject = {}) {
        Object.keys(styleObject).forEach((property) => {
            element.style[property] = styleObject[property];
        });
    },

    /**
     * Remove the styling from an element
     *
     * @param  {HTMLElement} element
     * @param  {Array} properties
     */
    remove(element, properties) {
        properties.forEach((property) => {
            element.style.removeProperty(property);
        });
    },
};
