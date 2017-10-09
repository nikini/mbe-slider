import Slider from '../slider';
import eventor from '../helpers/eventor';

/**
 * Append the arrows
 *
 * @return void
 */
Slider.prototype.appendArrows = function appendArrows() {
    if (!(this.options.navigation && this.options.navigation.arrows)) {
        return;
    }

    // Setup the back arrow
    const arrowBack = document.createElement('a');
    arrowBack.classList.add('cip-arrow-back');
    arrowBack.setAttribute('href', '#go-back');
    eventor.bine(arrowBack, this.getEventName('click'), this.arrowBackClick, this);


    // Setup the forward arrow
    const arrowForward = document.createElement('a');
    arrowForward.classList.add('cip-arrow-forward');
    arrowForward.setAttribute('href', '#go-forward');
    eventor.bine(arrowForward, this.getEventName('click'), this.arrowForwardClick, this);

    // Setup the container for the arrows
    const navigation = document.createElement('div');
    navigation.classList.add('cip-navigation-arrows');
    navigation.appendChild(arrowBack);
    navigation.appendChild(arrowForward);

    // Append everything to the parent
    this.element.parentNode.appendChild(navigation);

    // Set the navigation arrows
    this.setNavigationArrows();
};

/**
 * Go Back arrow click
 *
 * @param {Event} event
 */
Slider.prototype.arrowBackClick = function arrowBackClick(event) {
    event.preventDefault();
    this.gotoPreviousSlide(true);
};

/**
 * Go Forward arrow click
 *
 * @param {Event} event
 */
Slider.prototype.arrowForwardClick = function arrowForwardClick(event) {
    event.preventDefault();
    this.gotoNextSlide(true);
};

/**
 * Set the navigation arrows
 */
Slider.prototype.setNavigationArrows = function setNavigationArrows() {
    if (!(this.options.navigation && this.options.navigation.arrows)) {
        return;
    }
    const currentSlide = this.getCurrentSlideIndex();

    const arrowBack = this.element.parentNode.querySelector('.cip-arrow-back');
    if (currentSlide <= 1) { // First
        arrowBack.classList.add('hidden');
    } else {
        arrowBack.classList.remove('hidden');
    }

    const arrowForward = this.element.parentNode.querySelector('.cip-arrow-forward');
    if (currentSlide >= this._private.maxSlides) { // Last
        arrowForward.classList.add('hidden');
    } else {
        arrowForward.classList.remove('hidden');
    }
};
