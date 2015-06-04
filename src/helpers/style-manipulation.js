(function (mbeHelper) {

    'use strict';

    /**
     * Set CSS for an element
     *
     * @param  Node element
     * @param  Object obj
     *
     * @return void
     */
    mbeHelper.setStyle = function (element, obj) {
        var i;
        var styleObject = element.style;

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
     * @param  Node element
     * @param  array obj
     *
     * @return void
     */
    mbeHelper.removeStyle = function (element, obj) {
        var i;

        for (i = 0; i < obj.length; i++) {
            mbeHelper.removeSingleStyle(element, obj[i]);
        }
    };

    /**
     * Remove the single CSS from an element
     *
     * @param  Node element
     * @param  array obj
     *
     * @return void
     */
    mbeHelper.removeSingleStyle = function (element, property) {

        element.style.removeProperty(property);
    };

}(mbeHelper));
