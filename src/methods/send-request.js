var ajaxGetHash = require('../helpers/get-ajax-hash'),
    errorWrapper = require('../helpers/error-wrapper');

module.exports = function(client, hash) {
    var req,
        isAuthenticated = hash.isAuthenticated,
        accessToken = client.storageAdapter.getValue('accessToken'),
        ajaxHash;

    //Check for access token
    if (isAuthenticated && !accessToken) {
        throw new Error('Authorized request was attempted without an access token.');
    }

    //Get new ajax hash and wrapped error
    ajaxHash = ajaxGetHash(hash, isAuthenticated ? accessToken : null);
    ajaxHash.error = errorWrapper(client, ajaxHash.error);

    //Do the request
    req = client.options.ajax(ajaxHash);

    //Return the request
    return req;
};
