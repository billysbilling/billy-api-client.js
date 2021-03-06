//Locals
var CookieStorageAdapter = require('./storage-adapters/cookie'),
    defaultOptions = require('./default-options'),
    eventify = require('./helpers/eventify'),
    extendObject = require('./helpers/extend-object'),
    isAuthenticatedUrl = require('./helpers/is-authenticated-url'),
    JQueryAjaxAdapter = require('./request-adapters/jquery-ajax'),
    MemoryStorageAdapter = require('./storage-adapters/memory'),
    WebStorageAdapter = require('./storage-adapters/web');

//Methods
var login = require('./methods/login'),
    logout = require('./methods/logout'),
    sendRequest = require('./methods/send-request');

var BillyApiClient = function(options) {

    //Apply options
    this.options = extendObject({}, defaultOptions, options || {})

    //Add event emitter methods and additional listeners
    eventify(this);

    //Instantiate storage adapter
    this.storageAdapter = this.options.storageAdapter || new MemoryStorageAdapter();

    //Instantiate request adapter
    this.requestAdapter = this.options.requestAdapter || new JQueryAjaxAdapter();

    //Check initial authorization
    this.isAuthorized = !!this.storageAdapter.getValue('accessToken');
};

BillyApiClient.prototype = {

    /**
     * AJAX hash decorator
     */
    sendRequest: function(hash) {
        return sendRequest(this, hash);
    },

    /**
     * Authenticates a user with the API
     * @param email
     * @param password
     * @param remember
     * @param callback
     * @returns {*}
     */
    login: function(email, password, remember, callback) {
        return login(this, email, password, remember, callback);
    },

    /**
     * Logs the active user out of the API
     *
     * @param callback
     * @returns {*}
     */
    logout: function(callback) {
        return logout(this, callback);
    },

    /**
     * Authorize by directly providing an access token
     *
     * @param accessToken
     * @param persist
     */
    authorize: function(accessToken, persist) {
        this.storageAdapter.setValue('accessToken', accessToken, persist);
        this.trigger('authorize', [accessToken]);
    },

    /**
     * Make a managed request via sendRequest method
     *
     * @param method
     * @param url
     * @param hash
     * @returns {*}
     */
    request: function(method, url, hash) {

        //Set method, URL, authenticated endpoint flag, and headers
        hash.type = method;
        hash.url = this.options.apiUrl + url;
        hash.isAuthenticated = isAuthenticatedUrl(url, this.options.unauthenticatedUrls, this.options.apiUrl);
        hash.headers = extendObject({}, this.options.headers, hash.headers || {});

        //Add Accept-Language header if language options is set
        if (this.options.language) {
            var hasLanguage = Object.keys(hash.headers).some(function(name) {
                return name.toLowerCase() === 'accept-language'
            })
            if (!hasLanguage) {
                hash.headers['Accept-Language'] = this.options.language;
            }
        }

        //Make the request
        return this.sendRequest(hash);
    },

    /**
     * Basic request methods
     */
    'get': function(url, hash) {
        hash = hash || {};
        hash.type = 'GET';
        return this.request('GET', url, hash);
    },
    post: function(url, data, hash) {
        data = data || {};
        hash = hash || {};
        hash.data = data;
        return this.request('POST', url, hash);
    },
    put: function(url, data, hash) {
        data = data || {};
        hash = hash || {};
        hash.data = data;
        return this.request('PUT', url, hash);
    },
    patch: function(url, data, hash) {
        data = data || {};
        hash = hash || {};
        hash.data = data;
        return this.request('PATCH', url, hash);
    },
    'delete': function(url, hash) {
        hash = hash || {};
        return this.request('DELETE', url, hash);
    }
    /**
     * End basic request methods
     */
};

//Add storage adapters to class
BillyApiClient.storageAdapters = {
    CookieStorageAdapter: CookieStorageAdapter,
    MemoryStorageAdapter: MemoryStorageAdapter,
    WebStorageAdapter: WebStorageAdapter
};

module.exports = BillyApiClient;
