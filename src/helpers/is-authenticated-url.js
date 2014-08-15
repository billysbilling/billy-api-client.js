module.exports = function(url, urls, prefix) {
    var isUnauthorized = false;
    for (var i = 0; i < urls.length; i++) {
        var unauthorizedUrl = urls[i],
            relative = url.indexOf(unauthorizedUrl) === 0,
            absolute = url.slice(prefix.length).indexOf(unauthorizedUrl) === 0;

        //Check if unauthorized
        isUnauthorized = (relative || absolute);
        if (isUnauthorized) {
            break;
        }
    }
    return !isUnauthorized;
};
