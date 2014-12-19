(function () {

    /**
     * Set the parent data to the node data
     *
     * @return void
     */
    mbeSlider.prototype.setData = function () {

        var i;

        for (i in this.element.dataset) {
            if (this.element.dataset.hasOwnProperty(i)) {
                this.element.parentNode.dataset[i] = this.element.dataset[i];
            }
        }
    };

    /**
     * Init the CSS Function
     *
     * @return void
     */
    mbeSlider.prototype.initStyle = function () {
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
    mbeSlider.prototype.initHtml = function () {
        if (this.element.parentNode.classList.contains('mbe-slider')) {
            return;
        }

        // Create the element
        var
            wrapper = document.createElement('div'),
            clone = this.element.cloneNode(true);

        // Add The parent class
        wrapper.classList.add('mbe-slider');

        // Add the classes from the element to the wrappoer
        Array.prototype.forEach.call(this.element.classList, function (cssClass, index) {
            wrapper.classList.add(cssClass);
        }, this);

        // Make the element to be the parent
        wrapper.appendChild(clone);
        this.element.parentNode.replaceChild(wrapper, this.element);

        // Refetch the element
        this.setElement(clone);
    };

    /**
     * Init the Slider
     *
     * @return mbeSlider
     */
    mbeSlider.prototype.init = function () {

        //set the main element
        this.setElement(this.options.element);

        // Remove the White Space
        this.element.mbeRmoveWhiteSpace();

        //init the html
        this.initHtml();

        //set the slides
        this.setSlides();

        // Init the CSS
        this.initStyle();

        // Set the width of the slider
        this._private.width = this.element.offsetWidth;
        this._private.height = this.element.offsetHeight;

        //get the number of slides
        this._private.maxSlides = this.element.childNodes.length;
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

        /**
         * Init Event
         */
        if (this.options.onInit && typeof this.options.onInit === 'function') {
            this.options.onInit.call(this);
        }

        return this;
    };

}());
