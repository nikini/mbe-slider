(function () {

    /**
     * Bind all the events of the slider
     *
     * @return void
     */
    mbeSlider.prototype.bindEvents = function () {

        if (this.bindedEvents) {
            return;
        }

        this.element.mbeBindEvent(this.getEventName('start'), this.mouseDown, this);
        document.mbeBindEvent(this.getEventName('move'), this.mouseMove, this);
        document.mbeBindEvent(this.getEventName('end'), this.mouseUp, this);
        this.element.mbeBindEvent(this.getEventName('click'), this.click, this);
        window.mbeBindEvent(['resize'], this.resize, this);

        if (this.options.navigation && this.options.navigation.keys) {
            window.mbeBindEvent(['keydown'], this.keyDown, this);
        }

        if (this.options.navigation && this.options.navigation.type && this.options.navigation.clickable) {

            var self = this;

            Array.prototype.forEach.call(this.element.parentNode.querySelector('.' + this.options.navigation.className).childNodes, function (element, index) {

                element.mbeBindEvent(self.getEventName('click'), self.navigationClick, self);
            });
        }

        this.bindedEvents = true;
    };

    /**
     * Unbind all the events from the slider
     *
     * @return void
     */
    mbeSlider.prototype.unbindEvents = function () {

        this.element.mbeUnbindEvent(this.getEventName('start'), this.mouseDown, this);
        document.mbeUnbindEvent(this.getEventName('move'), this.mouseMove, this);
        document.mbeUnbindEvent(this.getEventName('end'), this.mouseUp, this);
        this.element.mbeUnbindEvent(this.getEventName('click'), this.click, this);
        window.mbeUnbindEvent(['resize'], this.resize, this);

        if (this.options.navigation && this.options.navigation.keys) {
            window.mbeUnbindEvent(['keydown'], this.keyDown, this);
        }

        this.bindedEvents = false;
    };

    /**
     * Get the name of the event based on the options and everything
     *
     * @param type String
     *
     * @return function
     */
    mbeSlider.prototype.getEventName = function (type) {

        var events = {
            'start': ['touchstart'],
            'move': ['touchmove'],
            'end': ['touchend'],
            'click': ['click']
        };

        if (this.options.navigation && this.options.navigation.drag) {
            events.start.push('mousedown');
            events.move.push('mousemove');
            events.end.push('mouseup');
        }

        return events[type] || undefined;
    };

}());
