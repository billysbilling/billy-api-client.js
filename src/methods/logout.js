/**
 * Logs the active user out of the API
 *
 * @param client
 * @param callback
 * @returns {*}
 */
module.exports = function(client, callback) {
    return client.post('/user/logout', {}, {
        success: function(payload, textStatus, xhr) {
            //Fire becameUnauthorized with the access token
            client.trigger('becameUnauthorized');

            //Call success callback
            if (callback) {
                callback(null, payload, textStatus, xhr);
            }
        },
        error: function(xhr, textStatus, errorThrown) {
            //Trigger error
            client.trigger('error', arguments);

            //Call original error
            if (callback) {
                var e = new Error('billy-api-client logout error.');
                e.xhr = xhr;
                e.textStatus = textStatus;
                e.errorThrown = errorThrown;
                callback(e);
            }
        },
        complete: function() {
            //Unset the access token
            client.storageAdapter.unsetValue('accessToken');
        }
    });
};
