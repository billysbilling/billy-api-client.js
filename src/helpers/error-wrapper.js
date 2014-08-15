/**
 * Wraps the error handler so the error event can be triggered on the client and original error will still be called
 *
 * @param client
 * @param errorHandler
 * @returns {Function}
 */
module.exports = function(client, errorHandler) {

    return function() {

        //Trigger error
        client.trigger('error', arguments);

        //Call original error
        if (errorHandler) {
            errorHandler.apply(null, arguments);
        }
    };
};
