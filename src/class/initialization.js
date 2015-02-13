(function (MbeSlider) {

    'use strict';

    /**
     * Set the parent data to the node data
     *
     * @return void
     */
    MbeSlider.prototype.setData = function () {

        //not using dataset because of IE's lack of support
        Array.prototype.forEach.call(this.element.attributes, function (attribute) {
            if (/^data\-/i.test(attribute.name)) { //is a data attribute
                this.element.parentNode.setAttribute(attribute.name, attribute.value);
            }
        }, this);
    };

    /**
     * Init the CSS Function
     *
     * @return void
     */
    MbeSlider.prototype.initStyle = function () {
        var i,
            elementStyle = this.getElementStyle(),
            slidesStyle = this.getSlidesStyle(),
            parentStyle = this.getParentStyle();

        this.element.mbeSetStyle(elementStyle);

        for (i = 0; i < this._private.slides.length; i++) {
            this._private.slides[i].element.mbeSetStyle(slidesStyle);
        }

        this.element.parentNode.mbeSetStyle(parentStyle);
    };

    /**
     * Init the HTML Function
     *
     * @return void
     */
    MbeSlider.prototype.initHtml = function () {
        if (this.element.parentNode.classList.contains('mbe-slider')) {
            return;
        }

        //create the element
        var wrapper = document.createElement('div');
        var clone = this.element.cloneNode(true);

        //get the element classes
        wrapper.setAttribute('class', this.element.className);

        //add The parent class
        wrapper.classList.add('mbe-slider');

        //make the element to be the parent
        wrapper.appendChild(clone);
        this.element.parentNode.replaceChild(wrapper, this.element);

        //refetch the element
        this.setElement(clone);
    };

    /**
     * Init the HTML for the slides Function
     *
     * @return void
     */
    MbeSlider.prototype.initSlidesHtml = function () {

        //if infinite duplicate the first and last element
        if (this.options.infinite && this.element.firstChild) {

            //clone the first and the last element
            var firstClone = this.element.firstChild.cloneNode(true);
            var lastClone = this.element.lastChild.cloneNode(true);

            //using setattribute instead of dataset for ie's sake
            firstClone.setAttribute('data-ignore', 1);
            lastClone.setAttribute('data-ignore', 1);

            //append the firstclone and prepend the lastclone
            this.element.appendChild(firstClone);
            this.element.insertBefore(lastClone, this.element.firstChild);
        }
    };

    /**
     * Init the Slider
     *
     * @return MbeSlider
     */
    MbeSlider.prototype.init = function () {

        //set the main element
        this.setElement(this.options.element);

        // Remove the White Space
        this.element.mbeRmoveWhiteSpace();

        //init the html
        this.initHtml();

        //init the slides html
        this.initSlidesHtml();

        //set the slides
        this.setSlides();

        // Init the CSS
        this.initStyle();

        // Set the width of the slider
        this._private.width = this.element.offsetWidth;
        this._private.height = this.element.offsetHeight;

        //get the number of slides
        this._private.totalSlides = this._private.slides.length;
        this._private.currentSlide.x = 1;
        this._private.currentSlide.y = 1;

        //append arrows
        this.appendArrows();

        //append navigation
        this.appendNavigation();

        //set the data to the parent
        this.setData();

        //bind the events
        this.bindEvents();

        //autoslide
        this.autoSlide();

        //go to first slide
        this.gotoFirstSlide(false);

        /**
         * Init Event
         */
        if (this.options.onInit && typeof this.options.onInit === 'function') {
            this.options.onInit.call(this);
        }

        return this;
    };

}(MbeSlider));
