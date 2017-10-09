import Slider from '../slider';

/**
 * Append navigation
 */
Slider.prototype.appendNavigation = function appendNavigation() {
    if (!(this.options.navigation && this.options.navigation.type)) {
        return;
    }

    // Make to lower case
    this.options.navigation.type = this.options.navigation.type.toLowerCase();

    // Make sure the type is allowed
    if (['bullets', 'thumbs'].indexOf(this.options.navigation.type) < 0) {
        this.options.navigation.type = 'bullets';
    }

    // Create the navigation
    const navigation = document.createElement('div');
    const navigationClass = this.options.navigation.className;

    // Add the class to navigation
    navigation.classList.add(navigationClass);
    navigation.classList.add(`${navigationClass}-${this.options.navigation.type}`);

    // Add all elements
    this._private.slides.forEach((element, index) => {
        if (element.ignore) {
            return;
        }
        const navigationItem = document.createElement('div');

        // Add the classes
        navigationItem.classList.add(`${navigationClass}-item`);
        navigationItem.classList.add(`${navigationClass}-item-${index}`);

        // Add the selected class to the first element
        if (index === 0) {
            navigationItem.classList.add(`${navigationClass}-item-selected`);
        }

        // Append an image if they are thumbs
        if (this.options.navigation.type === 'thumbs' && element.getAttribute('data-thumb')) {
            const img = document.createElement('img');
            img.src = element.getAttribute('data-thumb');
            navigationItem.appendChild(img);
        }

        // Set the slide in the data attribute
        navigationItem.setAttribute('data-slide', index + 1);

        // Append the item
        navigation.appendChild(navigationItem);
    }, this);

    this.element.parentNode.appendChild(navigation);

    // Set the navigation item as selected
    this.setNavigationItem();
};

/**
 * What happens when you click on an item
 */
Slider.prototype.navigationClick = function navigationClick(event) {
    event.preventDefault();

    const slide = parseInt(event.currentTarget.getAttribute('data-slide'), 10);
    if (this.options.direction === 'horizontal') {
        this.gotoSlide(slide, 1, true);
    } else {
        this.gotoSlide(1, slide, true);
    }
};

/**
 * Set the navigation item
 */
Slider.prototype.setNavigationItem = function setNavigationItem() {
    if (!(this.options.navigation && this.options.navigation.type)) {
        return;
    }

    let currentSlide = this.getCurrentSlideIndex();
    if (this.options.infinite) {
        currentSlide--;
        if (currentSlide === 0) {
            currentSlide = this._private.maxSlides;
        }
        if (currentSlide > this._private.maxSlides) {
            currentSlide = 1;
        }
    }

    const navigationClass = this.options.navigation.className;
    const navigationItems = this.element.parentNode.querySelector(`.${navigationClass}`).children;
    Array.prototype.forEach.call(navigationItems, (element, index) => {
        element.classList.remove(`${navigationClass}-item-selected`);
        if (index === currentSlide - 1) {
            element.classList.add(`${navigationClass}-item-selected`);
        }
    });
};
