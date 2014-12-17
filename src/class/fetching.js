(function () {

    /**
     * Set the element to the slider
     *
     * @return string
     */
    mbeSlider.prototype.setElement = function (element) {
        if (typeof element === 'string') {
            this.element = document.querySelector(element);
        } else {
            this.element = element;
        }

        if (!this.element) {
            mbeHelper.throwError('Element cannot be null', 'setElement', this);
        }
    };

    /**
     * Set the slides of the slider
     *
     * @return string
     */
    mbeSlider.prototype.setSlides = function () {
        var i;

        this._private.slides = [];

        for (i = 0; i < this.element.children.length; i++) {

            this._private.slides.push({
                element: this.element.children[i]
            });
        }
    };

}());
