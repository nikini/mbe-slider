import Slider from '../slider';
import eventor from '../helpers/eventor';

/**
 * Bind all the events of the slider
 */
Slider.prototype.bindEvents = function bindEvents() {
    if (this.bindedEvents) {
        return;
    }

    eventor.bind(this.element, this.getEventName('start'), this.mouseDown, this);
    eventor.bind(document, this.getEventName('move'), this.mouseMove, this);
    eventor.bind(document, this.getEventName('end'), this.mouseUp, this);
    eventor.bind(this.element, this.getEventName('click'), this.click, this);
    eventor.bind(window, ['resize'], this.resize, this);

    if (this.options.navigation && this.options.navigation.keys) {
        eventor.bind(window, ['keydown'], this.keyDown, this);
    }

    if (this.options.navigation && this.options.navigation.type && this.options.navigation.clickable) {
        const nodes = this.element.parentNode.querySelector(`.${this.options.navigation.className}`).children;
        Array.prototype.forEach.call(nodes, (element) => {
            eventor.bind(element, this.getEventName('click'), this.navigationClick, this);
        });
    }

    this.bindedEvents = true;
};

/**
 * Unbind all the events from the slider
 */
Slider.prototype.unbindEvents = function unbindEvents() {
    eventor.unbind(this.element, this.getEventName('start'));
    eventor.unbind(document, this.getEventName('move'));
    eventor.unbind(document, this.getEventName('end'));
    eventor.unbind(this.element, this.getEventName('click'));
    eventor.unbind(window, ['resize']);

    if (this.options.navigation && this.options.navigation.keys) {
        eventor.unbind(window, ['keydown']);
    }

    this.bindedEvents = false;
};

/**
 * Get the name of the event based on the options and everything
 *
 * @param  {string} type
 *
 * @return {Array}
 */
Slider.prototype.getEventName = function getEventName(type) {
    const events = {
        start: ['touchstart'],
        move: ['touchmove'],
        end: ['touchend'],
        click: ['click'],
    };

    if (this.options.navigation && this.options.navigation.drag) {
        events.start.push('mousedown');
        events.move.push('mousemove');
        events.end.push('mouseup');
    }

    return events[type] || [];
};
