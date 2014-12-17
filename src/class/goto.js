(function () {

    /**
     * Go to the slide "x"
     *
     * @param  integer x
     * @param  integer y
     * @param  mixed animate
     *
     * @return void
     */
    mbeSlider.prototype.gotoSlide = function (x, y, animate) {

        if (typeof animate === undefined) {
            animate = true;
        }

        // Set the animation to animate
        this.setAnimation(animate === true ? this.options.slideDuration : animate || 0);

        if (typeof x === undefined) {
            x = 0;
        }
        if (typeof y === undefined) {
            y = 0;
        }

        //make it within proportions
        if (x > this._private.maxSlides) {
            x = this._private.maxSlides;
        } else if (x <= 0) {
            x = 1;
        }

        //make it within proportions
        if (y > this._private.maxSlides) {
            y = this._private.maxSlides;
        } else if (y <= 0) {
            y = 1;
        }

        this._private.currentSlide.x = x;
        this._private.currentSlide.y = y;

        this.moveTo(- (x - 1) * this._private.width, - (y - 1) * this._private.height);

        //set the navigation item as selected
        this.setNavigationItem();

        //set the navigation arrows
        this.setNavigationArrows();

        /**
         * Init Event
         */
        if (this.options.afterSlide && typeof this.options.afterSlide === 'function') {

            this.options.afterSlide.call(this, this.getCurrentSlideIndex(), this.getCurrentSlide());
        }
    };


    /**
     * Go to the next slide
     *
     * @param  mixed animate
     *
     * @return void
     */
    mbeSlider.prototype.gotoNextSlide = function (animate) {

        var current = {
            x: this._private.currentSlide.x,
            y: this._private.currentSlide.y
        };

        if (this.options.direction === 'horizontal') {
            current.x ++;
        } else {
            current.y ++;
        }

        this.gotoSlide(current.x, current.y, animate);
    };


    /**
     * Go to the previous slide
     *
     * @param  mixed animate
     *
     * @return void
     */
    mbeSlider.prototype.gotoPreviousSlide = function (animate) {

        var current = {
            x: this._private.currentSlide.x,
            y: this._private.currentSlide.y
        };

        if (this.options.direction === 'horizontal') {
            current.x --;
        } else {
            current.y --;
        }

        this.gotoSlide(current.x, current.y, animate);
    };

}());
