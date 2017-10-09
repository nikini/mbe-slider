export default {
    /**
     * Bind an event to an object
     *
     * @param  {HTMLElement}  element
     * @param  {Array}  events
     * @param  {Function}  callback
     * @param  {mixed} thisValue
     */
    bind(element, events = [], callback, thisValue = {}) {
        if (typeof events !== 'object' || !events.length) {
            throw new Error('Cannot attach event with empty name');
        }

        if (!callback) {
            throw new Error('Function for the event does not exist');
        }

        if (!element.bindedEvents) {
            element.bindedEvents = {};
        }

        const usedFunction = callback.bind(thisValue);
        events.forEach((event) => {
            if (!element.bindedEvents[event]) {
                element.bindedEvents[event] = [];
            }
            element.bindedEvents[event].push(usedFunction);
            element.addEventListener(event, usedFunction, true);
        });
    },

    /**
     * Bind an event to an object
     *
     * @param  {HTMLElement}  element
     * @param  {Array}  events
     */
    unbind(element, events = []) {
        if (typeof events !== 'object' || events.length) {
            throw new Error('Cannot detach event with empty name');
        }

        events.forEach((event) => {
            if (element.bindedEvents[event] && element.bindedEvents[event].length) {
                element.bindedEvents[event].forEach((callback) => {
                    element.removeEventListener(event, callback, false);
                });
            }
            element.bindedEvents[event] = [];
        });
    },
};
