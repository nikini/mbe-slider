(function (MbeSlider, mbeHelper) {

    'use strict';

    /**
     * Bind all the events of the slider
     *
     * @return void
     */
    MbeSlider.prototype.bindEvents = function () {

        if (this.bindedEvents) {
            return;
        }

        mbeHelper.bindEvent(this.element, this.getEventName('start'), this.mouseDown, this);
        mbeHelper.bindEvent(document, this.getEventName('move'), this.mouseMove, this);
        mbeHelper.bindEvent(document, this.getEventName('end'), this.mouseUp, this);
        mbeHelper.bindEvent(this.element, this.getEventName('click'), this.click, this);
        mbeHelper.bindEvent(window, ['resize'], this.resize, this);

        if (this.options.navigation && this.options.navigation.keys) {
            mbeHelper.bindEvent(window, ['keydown'], this.keyDown, this);
        }

        if (this.options.navigation && this.options.navigation.type && this.options.navigation.clickable) {

            var self = this;

            Array.prototype.forEach.call(this.element.parentNode.querySelector('.' + this.options.navigation.className).childNodes, function (element) {

                mbeHelper.bindEvent(element, self.getEventName('click'), self.navigationClick, self);
            });
        }

        this.bindedEvents = true;
    };

    /**
     * Unbind all the events from the slider
     *
     * @return void
     */
    MbeSlider.prototype.unbindEvents = function () {

        mbeHelper.unbindEvent(this.element, this.getEventName('start'), this.mouseDown, this);
        mbeHelper.unbindEvent(document, this.getEventName('move'), this.mouseMove, this);
        mbeHelper.unbindEvent(document, this.getEventName('end'), this.mouseUp, this);
        mbeHelper.unbindEvent(this.element, this.getEventName('click'), this.click, this);
        mbeHelper.unbindEvent(window, ['resize'], this.resize, this);

        if (this.options.navigation && this.options.navigation.keys) {
            mbeHelper.unbindEvent(window, ['keydown'], this.keyDown, this);
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
    MbeSlider.prototype.getEventName = function (type) {

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

}(MbeSlider, mbeHelper));
