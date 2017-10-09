import Slider from '../slider';

/**
 * Get the style of the element
 */
Slider.prototype.getElementStyle = function getElementStyle() {
    const elementStyle = {
        'list-style': 'none',
        margin: '0',
        padding: '0',
    };
    switch (this.options.direction) {
    case 'horizontal':
        elementStyle['white-space'] = 'nowrap';
        break;
    case 'vertical':
        elementStyle.height = '100%';
        break;
    }
    return elementStyle;
};

/**
 * Get the style of the slides
 */
Slider.prototype.getSlidesStyle = function getSlidesStyle() {
    const slidesStyle = {
        margin: '0',
        padding: '0',
        height: '100%',
    };
    if (this.options.direction === 'horizontal') {
        slidesStyle.display = 'inline-block';
        slidesStyle['vertical-align'] = 'middle';
        slidesStyle.width = '100%';
    } else {
        slidesStyle.display = 'block';
        slidesStyle.width = 'auto';
    }
    return slidesStyle;
};

/**
 * Get the style of the parent
 */
Slider.prototype.getParentStyle = function getParentStyle() {
    const parentStyle = {
        overflow: 'hidden',
    };
    if (this.options.direction === 'vertical') {
        parentStyle.height = '100%';
    }
    return parentStyle;
};
