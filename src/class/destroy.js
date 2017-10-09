import Slider from '../slider';

/**
 * Destroy the slider style
 */
Slider.prototype.destroyStyle = function destroyStyle() {
    const elementStyle = this.getElementStyle();
    Object.keys(elementStyle).forEach((property) => {
        this.element.style.removeProperty(property);
    });

    const slidesStyle = this.getSlidesStyle();
    Object.keys(slidesStyle).forEach((property) => {
        this._private.slides.forEach((slide) => {
            slide.style.removeProperty(property);
        });
    });

    const parentStyle = this.getParentStyle();
    Object.keys(parentStyle).forEach((property) => {
        this.element.parentNode.style.removeProperty(property);
    });
};

/**
 * Destroy the slider HTML
 */
Slider.prototype.destroyHtml = function destroyHtml() {
    if (!this.element.parentNode.classList.contains('cip-slider')) {
        return;
    }

    const parentNode = this.element.parentNode;
    parentNode.parentNode.insertBefore(this.element, parentNode);
    parentNode.parentNode.removeChild(parentNode);
};

/**
 * Destroy the slider
 */
Slider.prototype.destroy = function destroy() {
    console.time(`destroy #${this.options.id}`);

    this.destroyStyle();
    this.unbindEvents();
    this.destroyHtml();

    console.timeEnd(`destroy #${this.options.id}`);
};
