var CookieStorageAdapter = module.exports = function(options) {
    options = options || {};

    //Namespace fallback
    if (options.namespace) {
        this.prefix = options.namespace + '_';
    }

    //Persistence
    if (options.ttl) {
        this.ttl = options.ttl;
    }
};

CookieStorageAdapter.prototype = {

    /**
     * Cookie prefix
     */
    prefix: '',

    /**
     * Cookie persistence interval (in days)
     */
    ttl: 365,

    /**
     * Saves a value to the store.  Persist will set a TTL of 2 months, otherwise storage will be session-based
     *
     * @param key
     * @param value
     * @param persist
     */
    setValue: function(key, value, persist) {
        var date = new Date();

        //Advance by TTL
        date.setDate(date.getDate() + this.ttl);

        //Get the date string
        var expires = date.toUTCString(),
            expiresString = persist ? 'expires=' + expires + '; ' : '' ;

        //Set the cookie
        document.cookie = this.prefix + key + '=' + value + '; ' + expiresString + 'path=/';
    },

    /**
     * Gets a value from the store
     *
     * @param key
     */
    getValue: function(key) {
        var regex = new RegExp('(?:(?:^|.*;\\s*)' + this.prefix + key + '\\s*\\=\\s*([^;]*).*$)|^.*$'),
            value = document.cookie.replace(regex, "$1");
        return value || null;
    },

    /**
     * Deletes a value from the store
     *
     * @param key
     */
    unsetValue: function(key) {
        document.cookie = this.prefix + key + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    }
};
