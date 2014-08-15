/**
 * Sends a log in request for a set of user credentials and handles client authorization
 *
 * @param client
 * @param email
 * @param password
 * @param remember
 * @param callback
 * @returns {*}
 */
module.exports = function(client, email, password, remember, callback) {
    return client.post('/user/login', {
            credentials: {
                email: email,
                password: password
            }
        }, {
            success: function(payload, textStatus, xhr) {
                var accessToken = payload.meta.accessToken;

                //Authorize the client
                client.authorize(accessToken, remember);

                //Call success callback
                if (callback) {
                    callback(null, payload, textStatus, xhr);
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                if (callback) {
                    var e = new Error('billy-api-client login error.');
                    e.xhr = xhr;
                    e.textStatus = textStatus;
                    e.errorThrown = errorThrown;
                    callback(e);
                }
            }
        });
};
