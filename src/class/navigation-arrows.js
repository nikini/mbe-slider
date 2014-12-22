(function (MbeSlider) {

    'use strict';

    /**
     * Append the arrows
     *
     * @return void
     */
    MbeSlider.prototype.appendArrows = function () {

        if (!(this.options.navigation && this.options.navigation.arrows)) {
            return;
        }

        //setup the back arrow
        var arrowBack = document.createElement('a');
        arrowBack.classList.add('mbe-arrow-back');
        arrowBack.setAttribute('href', '#go-back');
        arrowBack.mbeBindEvent(this.getEventName('click'), this.arrowBackClick, this);


        //setup the forward arrow
        var arrowForward = document.createElement('a');
        arrowForward.classList.add('mbe-arrow-forward');
        arrowForward.setAttribute('href', '#go-forward');
        arrowForward.mbeBindEvent(this.getEventName('click'), this.arrowForwardClick, this);

        //setup the container for the arrows
        var navigation = document.createElement('div');
        navigation.classList.add('mbe-navigation-arrows');
        navigation.appendChild(arrowBack);
        navigation.appendChild(arrowForward);

        //append everything to the parent
        this.element.parentNode.appendChild(navigation);

        //set the navigation arrows
        this.setNavigationArrows();
    };


    /**
     * Go Back arrow click
     *
     * @return void
     */
    MbeSlider.prototype.arrowBackClick = function (e) {

        e.preventDefault();

        this.gotoPreviousSlide(true);
    };


    /**
     * Go Forward arrow click
     *
     * @return void
     */
    MbeSlider.prototype.arrowForwardClick = function (e) {

        e.preventDefault();

        this.gotoNextSlide(true);
    };


    /**
     * Set the navigation arrows
     *
     * @return void
     */
    MbeSlider.prototype.setNavigationArrows = function () {

        if (!(this.options.navigation && this.options.navigation.arrows)) {
            return;
        }

        var
            currentSlide = this.getCurrentSlideIndex(),
            arrowBack = this.element.parentNode.querySelector('.mbe-arrow-back'),
            arrowForward = this.element.parentNode.querySelector('.mbe-arrow-forward');

        if (currentSlide <= 1) { //first
            arrowBack.classList.add('hidden');
        } else {
            arrowBack.classList.remove('hidden');
        }

        if (currentSlide >= this._private.maxSlides) { //last
            arrowForward.classList.add('hidden');
        } else {
            arrowForward.classList.remove('hidden');
        }
    };

}(MbeSlider));
