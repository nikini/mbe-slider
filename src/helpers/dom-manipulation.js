(function (mbeHelper) {

    'use strict';

    /**
     * Remove white space between tags
     *
     * @param  Node element
     *
     * @return
     */
    mbeHelper.removeWhiteSpace = function (element) {
        var i, node;
        for (i = 0; i < element.childNodes.length; i++) {
            node = element.childNodes[i];
            if (node.nodeType === 3 && !/\S/.test(node.nodeValue)) {
                element.removeChild(node);
            }
        }
    };

}(mbeHelper));
