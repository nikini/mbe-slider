(function () {

    'use strict';

    /**
     * Remove white space between tags
     *
     * @param  string type
     * @param  function func
     *
     * @return
     */
    Node.prototype.mbeRmoveWhiteSpace = function () {
        var i, node;
        for (i = 0; i < this.childNodes.length; i++) {
            node = this.childNodes[i];
            if (node.nodeType === 3 && !/\S/.test(node.nodeValue)) {
                this.removeChild(node);
            }
        }
    };

}());
