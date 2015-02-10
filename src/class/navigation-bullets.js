(function (MbeSlider) {

    'use strict';

    /**
     * Append navigation
     *
     * @return void
     */
    MbeSlider.prototype.appendNavigation = function () {

        if (!(this.options.navigation && this.options.navigation.type)) {
            return;
        }

        //make to lower case
        this.options.navigation.type = this.options.navigation.type.toLowerCase();

        //make sure the type is allowed
        if ([ 'bullets', 'thumbs' ].indexOf(this.options.navigation.type) < 0) {
            this.options.navigation.type = 'bullets';
        }

        //create the navigation
        var
            navigation = document.createElement('div'),
            navigationClass = this.options.navigation.className;

        //add the class to navigation
        navigation.classList.add(navigationClass);
        navigation.classList.add(navigationClass + '-' + this.options.navigation.type);

        //add all elements
        this._private.slides.forEach(function (element, index) {
            if (element.ignore) {
                return;
            }
            var navigationItem = document.createElement('div');

            //add the classes
            navigationItem.classList.add(navigationClass + '-item');
            navigationItem.classList.add(navigationClass + '-item-' + index);

            //add the selected class to the first element
            if (index === 0) {
                navigationItem.classList.add(navigationClass + '-item-selected');
            }

            //append an image if they are thumbs
            if (this.options.navigation.type === 'thumbs' && element.getAttribute('data-thumb')) {
                //create the image
                var img = document.createElement('img');

                //set the source
                img.src = element.getAttribute('data-thumb');

                //append the image
                navigationItem.appendChild(img);
            }

            //set the slide in the data attribute
            navigationItem.setAttribute('data-slide', index + 1);

            //append the item
            navigation.appendChild(navigationItem);
        }, this);

        this.element.parentNode.appendChild(navigation);

        //set the navigation item as selected
        this.setNavigationItem();
    };

    /**
     * What happens when you click on an item
     *
     * @return void
     */
    MbeSlider.prototype.navigationClick = function (event) {
        event.preventDefault();

        var slide = parseInt(event.currentTarget.getAttribute('data-slide'), 10);

        if (this.options.direction === 'horizontal') {
            this.gotoSlide(slide, 1, true);
        } else {
            this.gotoSlide(1, slide, true);
        }
    };

    /**
     * Set the navigation item
     *
     * @return void
     */
    MbeSlider.prototype.setNavigationItem = function () {

        if (!(this.options.navigation && this.options.navigation.type)) {
            return;
        }

        var
            currentSlide = this.getCurrentSlideIndex(),
            navigationClass = this.options.navigation.className,
            navigationItems = this.element.parentNode.querySelector('.' + navigationClass).childNodes;

        if (this.options.infinite) {
            currentSlide--;
            if (currentSlide === 0) {
                currentSlide = this._private.maxSlides;
            }
            if (currentSlide > this._private.maxSlides) {
                currentSlide = 1;
            }
        }

        Array.prototype.forEach.call(navigationItems, function (element, index) {

            element.classList.remove(navigationClass + '-item-selected');

            if (index === currentSlide - 1) {
                element.classList.add(navigationClass + '-item-selected');
            }
        });
    };

}(MbeSlider));
