import Slider from '../slider';
import styler from '../helpers/styler';
import removeWhiteSpace from '../helpers/remove-white-space';

/**
 * Init the CSS Function
 */
Slider.prototype.initStyle = function initStyle() {
    const elementStyle = this.getElementStyle();
    styler.set(this.element, elementStyle);

    const slidesStyle = this.getSlidesStyle();
    this._private.slides.forEach((slide) => {
        styler.set(slide.element, slidesStyle);
    });

    const parentStyle = this.getParentStyle();
    styler.set(this.element.parentNode, parentStyle);
};

/**
 * Init the HTML Function
 */
Slider.prototype.initHtml = function initHtml() {
    if (this.element.parentNode.classList.contains('cip-slider')) {
        return;
    }

    // Remove the white space
    removeWhiteSpace(this.element);

    // Create the element
    const wrapper = document.createElement('div');
    const clone = this.element.cloneNode(true);

    // Get the element classes
    wrapper.setAttribute('class', this.element.className);

    // Add The parent class
    wrapper.classList.add('cip-slider');

    // Make the element to be the parent
    wrapper.appendChild(clone);
    this.element.parentNode.replaceChild(wrapper, this.element);

    // Refetch the element
    this.setElement(clone);

    // Initialize the slides HTML now (if there are any)
    // If infinite duplicate the first and last element
    if (this.options.infinite && this.element.children.length) {
        const length = this.element.children.length;

        // Clone the first and the last element
        const firstClone = this.element.children[0].cloneNode(true);
        const lastClone = this.element.children[length - 1].cloneNode(true);

        // Using setattribute instead of dataset for ie's sake
        firstClone.setAttribute('data-ignore', 1);
        lastClone.setAttribute('data-ignore', 1);

        // Append the firstclone and prepend the lastclone
        this.element.appendChild(firstClone);
        this.element.insertBefore(lastClone, this.element.children[0]);
    }
};

/**
 * Init the Slider
 *
 * @return Slider
 */
Slider.prototype.initialize = function initialize() {
    // Set the main element
    this.setElement(this.options.element);

    // Init the html
    this.initHtml();

    // Set the slides
    this.setSlides();

    // Init the CSS
    this.initStyle();

    // Set the width of the slider
    this._private.width = this.element.offsetWidth;
    this._private.height = this.element.offsetHeight;

    // Get the number of slides
    this._private.totalSlides = this._private.slides.length;
    this._private.currentSlide.x = 1;
    this._private.currentSlide.y = 1;

    // Append arrows <><><>
    this.appendArrows();

    // Append navigation <><><>
    this.appendNavigation();

    // Set the data to the parent
    this.setData();

    // Bind the events
    this.bindEvents();

    // Autoslide <><><>
    this.autoSlide();

    // Go to first slide
    this.gotoFirstSlide(false);

    // Init Event
    if (this.options.onInit && typeof this.options.onInit === 'function') {
        this.options.onInit.call(this);
    }

    return this;
};
