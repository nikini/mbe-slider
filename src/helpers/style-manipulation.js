(function () {

    'use strict';

    /**
     * Set CSS for an element
     *
     * @param  Object obj
     *
     * @return void
     */
    Node.prototype.mbeSetStyle = function (obj) {
        var i;

        for (i in obj) {
            if (obj.hasOwnProperty(i)) {
                this.style[i] = obj[i];
            }
        }
    };

    /**
     * Remove the CSS from an element
     *
     * @param  array obj
     *
     * @return void
     */
    Node.prototype.mbeRemoveStyle = function (obj) {
        var i;

        for (i = 0; i < obj.length; i++) {
            this.mbeRemoveSingleStyle(obj[i]);
        }
    };

    /**
     * Remove the single CSS from an element
     *
     * @param  array obj
     *
     * @return void
     */
    Node.prototype.mbeRemoveSingleStyle = function (property) {

        this.style.removeProperty(property);
    };

}());
