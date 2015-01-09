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
        var styleObject = this.style;

        for (i in obj) {
            if (obj.hasOwnProperty(i)) {

                if (typeof MSStyleCSSProperties === 'undefined') {
                    styleObject.setProperty(i, obj[i]);
                } else {
                    //internet explorer
                    styleObject[i] = obj[i];
                }
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
