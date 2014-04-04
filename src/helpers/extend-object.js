module.exports = function() {
    var destinationObject = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var currentObject = arguments[i];
        for (var key in currentObject) {
            if (currentObject.hasOwnProperty(key)) {
                destinationObject[key] = currentObject[key];
            }
        }
    }
    return destinationObject;
};