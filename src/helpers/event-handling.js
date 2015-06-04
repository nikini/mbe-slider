(function (mbeHelper) {

    'use strict';

    /**
     * Bind an event to an object
     *
     * @param  Node element
     * @param  array events
     * @param  function func
     * @param  object thisValue
     *
     * @return
     */
    mbeHelper.bindEvent = function (element, events, func, thisValue) {

        if (!events) {
            mbeHelper.throwError('Cannot attach event with empty name', 'bindEvent', element);
            return;
        }

        if (!func) {
            mbeHelper.throwError('Function for the event does not exist', 'bindEvent', element);
            return;
        }

        var usedFunction = func.bind(thisValue);

        if (!element.bindedEvents) {
            element.bindedEvents = {};
        }

        events.forEach(function (event) {

            if (!this.bindedEvents[event]) {
                this.bindedEvents[event] = [];
            }
            this.bindedEvents[event].push(usedFunction);

            if (this.addEventListener) {
                this.addEventListener(event, usedFunction, true);
            } else {
                this.attachEvent('on' + event, usedFunction);
            }
        }, element);
    };

    /**
     * Unbind an event from an object
     *
     * @param  Node element
     * @param  array events
     * @param  function func
     * @param  object thisValue
     *
     * @return
     */
    mbeHelper.unbindEvent = function (element, events, func, thisValue) {

        if (!events) {
            mbeHelper.throwError('Cannot dettach event with empty name', 'unbindEvent', element);
            return;
        }

        if (!func) {
            mbeHelper.throwError('Function for the event dettachment does not exist', 'unbindEvent', element);
            return;
        }

        events.forEach(function (event) {

            var i;

            if (this.bindedEvents[event] && this.bindedEvents[event].length) {
                for (i = 0; i < this.bindedEvents[event].length; i++) {
                    if (this.removeEventListener) {
                        this.removeEventListener(event, this.bindedEvents[event][i], false);
                    } else {
                        this.detachEvent('on' + event, this.bindedEvents[event][i]);
                    }
                }
            }

            if (this.removeEventListener) {
                this.removeEventListener(event, func.bind(thisValue), false);
            } else {
                this.attachEvent('on' + event, func.bind(thisValue));
            }
        }, element);
    };

}(mbeHelper));
