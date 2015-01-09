(function (mbeHelper) {

    'use strict';


    if (Node.prototype.hasOwnProperty('classList')) {
        return;
    }

    Object.defineProperty(Node.prototype, 'classList', {
        get: function () {

            //get the class
            var objectClass = this.getAttribute('class') || '';

            //make an array out of the classes
            var classes = objectClass.match(/[\w\-]+/ig) || [];

            //save the reference to the node
            var self = this;

            return {

                /**
                 * Add the classes to the node
                 */
                add: function () {
                    var i;

                    for (i = 0; i < arguments.length; i++) {
                        if (classes.indexOf(arguments[i]) < 0) {
                            classes.push(arguments[i]);
                        }
                    }

                    this.refresh();
                },

                /**
                 * Remove a class from the node
                 *
                 * @param string className
                 *
                 * @return void
                 */
                remove: function (className) {
                    var index = classes.indexOf(className);

                    if (index < 0) {
                        classes.splice(index, 1);
                    }

                    this.refresh();
                },

                /**
                 * Toggle a class for the node
                 *
                 * @param string className
                 * @param boolean truth
                 *
                 * @return void
                 */
                toggle: function (className, truth) {
                    var index = (truth === undefined ? !this.contains(className) : truth);

                    if (truth) {
                        if (!this.contains(className)) {
                            this.add(className);
                        }
                    } else {
                        this.remove(className);
                    }
                },

                /**
                 * Detect wether node contains a class or not
                 *
                 * @param string className
                 *
                 * @return void
                 */
                contains: function (className) {
                    return classes.indexOf(className) >= 0;
                },

                /**
                 * Move the class list to the class attribute of the node
                 *
                 * @return void
                 */
                refresh: function () {
                    self.className = classes.join(' ');
                    self.setAttribute('class', self.className);
                }
            };
        }
    });

}(mbeHelper));
