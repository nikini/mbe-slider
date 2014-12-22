(function (mbeHelper) {

    'use strict';

    /**
     * Merge two objects
     *
     * @param  object a
     * @param  object b
     *
     * @return object
     */
    mbeHelper.mergeObjects = function (a, b) {
        var i;

        for (i in b) {
            if (b.hasOwnProperty(i)) {
                if (typeof b[i] === 'object' && !(b[i] instanceof Element)) {
                    if (!a[i] || typeof a[i] !== 'object') {
                        a[i] = {};
                    }
                    a[i] = mbeHelper.mergeObjects(a[i], b[i]);
                } else {
                    a[i] = b[i];
                }
            }
        }
        return a;
    };

    /**
     * Convert Object to number
     *
     * @param mixed a
     *
     * @return number
     */
    mbeHelper.toNumber = function (x) {
        x = Number(x);

        if (isNaN(x) || !isFinite(x)) {
            x = 0;
        }

        return x;
    };

}(mbeHelper));
