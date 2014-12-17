(function () {

    /**
     * Init the CSS Function
     *
     * @return void
     */
    mbeSlider.prototype.destroyStyle = function () {
        var i, j,
            elementStyle = this.getElementStyle(),
            slidesStyle = this.getSlidesStyle(),
            parentStyle = this.getParentStyle();

        for (i in elementStyle) {
            if (elementStyle.hasOwnProperty(i)) {
                this.element.mbeRemoveSingleStyle(i);
            }
        }

        for (i in slidesStyle) {
            if (slidesStyle.hasOwnProperty(i)) {
                for (j = 0; j < this._private.slides.length; j++) {
                    this._private.slides[j].element.mbeRemoveSingleStyle(i);
                }
            }
        }

        for (i in parentStyle) {
            if (parentStyle.hasOwnProperty(i)) {
                this.element.parentNode.mbeRemoveSingleStyle(i);
            }
        }
    };

    /**
     * Destroy the Slider HTML Function
     *
     * @return void
     */
    mbeSlider.prototype.destroyHtml = function () {
        if (!this.element.parentNode.classList.contains('mbe-slider')) {
            return;
        }

        var parentNode = this.element.parentNode;
        parentNode.parentNode.insertBefore(this.element, parentNode);
        parentNode.parentNode.removeChild(parentNode);
    };

    /**
     * Destroy the slider
     *
     * @return void
     */
    mbeSlider.prototype.destroy = function () {

        console.time('destroy #' + this.options.id);

        this.destroyStyle();
        this.unbindEvents();
        this.destroyHtml();

        console.timeEnd('destroy #' + this.options.id);
    };

}());
