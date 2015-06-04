(function (MbeSlider, mbeHelper) {

    'use strict';

    /**
     * Init the CSS Function
     *
     * @return void
     */
    MbeSlider.prototype.destroyStyle = function () {
        var i, j,
            elementStyle = this.getElementStyle(),
            slidesStyle = this.getSlidesStyle(),
            parentStyle = this.getParentStyle();

        for (i in elementStyle) {
            if (elementStyle.hasOwnProperty(i)) {
                mbeHelper.removeSingleStyle(this.element, i);
            }
        }

        for (i in slidesStyle) {
            if (slidesStyle.hasOwnProperty(i)) {
                for (j = 0; j < this._private.slides.length; j++) {
                    mbeHelper.removeSingleStyle(this._private.slides[j].element, i);
                }
            }
        }

        for (i in parentStyle) {
            if (parentStyle.hasOwnProperty(i)) {
                mbeHelper.removeSingleStyle(this.element.parentNode, i);
            }
        }
    };

    /**
     * Destroy the Slider HTML Function
     *
     * @return void
     */
    MbeSlider.prototype.destroyHtml = function () {
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
    MbeSlider.prototype.destroy = function () {

        console.time('destroy #' + this.options.id);

        this.destroyStyle();
        this.unbindEvents();
        this.destroyHtml();

        console.timeEnd('destroy #' + this.options.id);
    };

}(MbeSlider, mbeHelper));
