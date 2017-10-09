export default (element) => {
    Array.prototype.forEach.call(element.childNodes, (node) => {
        if (node.nodeType === 3 && !/\S/.test(node.nodeValue)) {
            element.removeChild(node);
        }
    });
};
