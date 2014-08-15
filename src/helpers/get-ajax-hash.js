var extendObject = require('./extend-object');

module.exports = function(hash, accessToken) {

    //Extend properties onto hash
    var ajaxHash = extendObject({
        dataType: 'json'
    }, hash);

    //Stringify data
    if (hash.data && typeof hash.data !== 'string' && hash.type !== 'GET') {
        ajaxHash.data = JSON.stringify(hash.data);
        ajaxHash.contentType = 'application/json; charset=utf-8';
    }

    //Add X-Access-Token header if accessToken is provided
    if (accessToken) {
        ajaxHash.headers['X-Access-Token'] = accessToken;
    }

    //Return new hash
    return ajaxHash;
};
