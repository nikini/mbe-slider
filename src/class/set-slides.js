import Slider from '../slider';

Slider.prototype.setSlides = function setSlides() {
    this._private.slides = [];
    this._private.maxSlides = 0;

    Array.prototype.forEach.call(this.element.children, (child) => {
        // Get the ignore data attribute
        const ignore = Number(child.getAttribute('data-ignore'));
        let index = -1;

        if (!ignore) {
            this._private.maxSlides ++;
            index = this._private.maxSlides;
        }

        this._private.slides.push({
            index,
            ignore: Boolean(ignore),
            element: child,
        });
    });
};
