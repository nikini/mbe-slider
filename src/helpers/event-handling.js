(function () {

    /**
     * Bind an event to an object
     *
     * @param  array events
     * @param  function func
     * @param  object thisValue
     *
     * @return
     */
    Node.prototype.mbeBindEvent = function (events, func, thisValue) {

        if (!events) {
            mbeHelper.throwError('Cannot attach event with empty name', 'mbeBindEvent', this);
            return;
        }

        if (!func) {
            mbeHelper.throwError('Function for the event does not exist', 'mbeBindEvent', this);
            return;
        }

        var usedFunction = func.bind(thisValue);

        if (!this.bindedEvents) {
            this.bindedEvents = {};
        }

        events.forEach(function (event, value) {

            if (!this.bindedEvents[event]) {
                this.bindedEvents[event] = [];
            }
            this.bindedEvents[event].push(usedFunction);

            if (this.addEventListener) {
                this.addEventListener(event, usedFunction, false);
            } else {
                this.attachEvent('on' + event, usedFunction);
            }
        }, this);
    };
    Window.prototype.mbeBindEvent = Node.prototype.mbeBindEvent;

    /**
     * Unbind an event from an object
     *
     * @param  array events
     * @param  function func
     * @param  object thisValue
     *
     * @return
     */
    Node.prototype.mbeUnbindEvent = function (events, func, thisValue) {

        if (!events) {
            mbeHelper.throwError('Cannot dettach event with empty name', 'mbeUnbindEvent', this);
            return;
        }

        if (!func) {
            mbeHelper.throwError('Function for the event dettachment does not exist', 'mbeUnbindEvent', this);
            return;
        }

        events.forEach(function (event, value) {

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
        }, this);
    };
    Window.prototype.mbeUnbindEvent = Node.prototype.mbeUnbindEvent;

}());
