import Slider from '../slider';

/**
 * Go to the slide x and y
 *
 * @param  {Number} x
 * @param  {Number} y
 * @param  {Boolean|Number} animate
 */
Slider.prototype.gotoSlide = function gotoSlide(x = 0, y = 0, animate = true) {
    const duration = (animate === true ? this.options.slideDuration : animate) || 0;

    // Set the animation to animate
    this.setAnimation(duration);

    // Make it within proportions
    if (x > this._private.totalSlides) {
        x = this._private.totalSlides;
    } else if (x <= 0) {
        x = 1;
    }

    // Make it within proportions
    if (y > this._private.totalSlides) {
        y = this._private.totalSlides;
    } else if (y <= 0) {
        y = 1;
    }

    this._private.currentSlide.x = x;
    this._private.currentSlide.y = y;

    this.moveTo(-(x - 1) * this._private.width, -(y - 1) * this._private.height);

    // Set the navigation item as selected
    this.setNavigationItem();

    // Set the navigation arrows
    this.setNavigationArrows();

    // Set timeout
    window.setTimeout(this.afterSlide.bind(this), duration);
};

/**
 * Called after the animation is done
 */
Slider.prototype.afterSlide = function afterSlide() {
    // Autoslide
    this.autoSlide();

    // Infinite
    if (this.options.infinite) {
        if (this.options.direction === 'horizontal') {
            if (this._private.currentSlide.x === this._private.totalSlides) {
                this.gotoSlide(2, this._private.currentSlide.y, false);
            }
            if (this._private.currentSlide.x === 1) {
                this.gotoSlide(this._private.totalSlides - 1, this._private.currentSlide.y, false);
            }
        } else {
            if (this._private.currentSlide.y === this._private.totalSlides) {
                this.gotoSlide(this._private.currentSlide.x, 2, false);
            }
            if (this._private.currentSlide.y === 1) {
                this.gotoSlide(this._private.currentSlide.x, this._private.totalSlides - 1, false);
            }
        }
    }

    // After Slide Event
    if (this.options.afterSlide && typeof this.options.afterSlide === 'function') {
        this.options.afterSlide.call(this, this.getCurrentSlideIndex(), this.getCurrentSlide());
    }
};

/**
 * Go to the next slide
 *
 * @param  {Boolean|Number} animate
 */
Slider.prototype.gotoNextSlide = function gotoNextSlide(animate) {
    const current = {
        x: this._private.currentSlide.x,
        y: this._private.currentSlide.y,
    };

    if (this.options.direction === 'horizontal') {
        if (current.x < this._private.totalSlides) {
            current.x++;
        } else {
            if (this.options.infinite) {
                current.x = 1;
            } else {
                this.stopAutoSlide();
                return;
            }
        }
    } else {
        if (current.y < this._private.totalSlides) {
            current.y++;
        } else {
            if (this.options.infinite) {
                current.y = 1;
            } else {
                this.stopAutoSlide();
                return;
            }
        }
    }

    this.gotoSlide(current.x, current.y, animate);
};

/**
 * Go to the previous slide
 *
 * @param  {Boolean|Number} animate
 */
Slider.prototype.gotoPreviousSlide = function gotoPreviousSlide(animate) {
    const current = {
        x: this._private.currentSlide.x,
        y: this._private.currentSlide.y,
    };

    if (this.options.direction === 'horizontal') {
        if (current.x > 1) {
            current.x--;
        } else {
            if (this.options.infinite) {
                current.x = this._private.maxSlides;
            } else {
                this.stopAutoSlide();
                return;
            }
        }
    } else {
        if (current.y > 1) {
            current.y--;
        } else {
            if (this.options.infinite) {
                current.y = this._private.maxSlides;
            } else {
                this.stopAutoSlide();
                return;
            }
        }
    }

    this.gotoSlide(current.x, current.y, animate);
};

/**
 * Go to the first slide
 *
 * @param  {Boolean|Number} animate
 */
Slider.prototype.gotoFirstSlide = function gotoFirstSlide(animate) {
    let slide = 1;
    const current = {
        x: slide,
        y: slide,
    };

    if (this.options.infinite) {
        slide++;
    }

    if (this.options.direction === 'horizontal') {
        current.x = slide;
    } else {
        current.y = slide;
    }

    this.gotoSlide(current.x, current.y, animate);
};
