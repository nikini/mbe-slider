(function (MbeSlider, mbeHelper) {

    'use strict';

    /**
     * Set the element to the slider
     *
     * @return string
     */
    MbeSlider.prototype.setElement = function (element) {
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
    MbeSlider.prototype.setSlides = function () {
        var i, ignore, index;
        var length = this.element.children.length;

        this._private.slides = [];
        this._private.maxSlides = 0;

        for (i = 0; i < length; i++) {

            //get the ignore data attribute
            ignore = Number(this.element.children[i].getAttribute('data-ignore'));

            if (!ignore) {
                this._private.maxSlides ++;
                index = this._private.maxSlides;
            } else {
                index = -1;
            }

            this._private.slides.push({
                index: index,
                ignore: Boolean(ignore),
                element: this.element.children[i]
            });
        }
    };

}(MbeSlider, mbeHelper));
