(function () {

    /**
     * Throw an mbe Slider Error
     *
     * @param String errorString
     * @param String functionName
     * @param Object object
     *
     * @return void
     */
    mbeHelper.throwError = function (errorString, functionName, object) {
        throw {
            'name': 'mbeSliderException',
            'message': errorString,
            'log': {
                'function': functionName,
                'object': object || null
            },
            'toString': function () {
                return this.name + ' > ' + this.log.function + ': ' + this.message;
            }
        };
    };

}());
