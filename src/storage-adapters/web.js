var WebStorageAdapter = module.exports = function(options) {
    options = options || {};

    //Check support
    if (!window.sessionStorage) {
        throw new Error('sessionStorage is not supported by this platform.');
    }
    if (!window.localStorage) {
        throw new Error('localStorage is not supported by this platform.');
    }

    //Namespace fallback
    if (options.namespace) {
        this.prefix = options.namespace + '_';
    }
};

WebStorageAdapter.prototype = {

    /**
     * Storage key prefix
     */
    prefix: '',

    /**
     * Saves a value to the store.  Persist will set in localStorage, otherwise it will be saved in session storage
     *
     * @param key
     * @param value
     * @param persist
     */
    setValue: function(key, value, persist) {
        this.unsetValue(key);
        window[persist ? 'localStorage' : 'sessionStorage'].setItem(this.prefix + key, value);
    },

    /**
     * Gets a value from the store
     *
     * @param key
     */
    getValue: function(key) {
        return sessionStorage.getItem(this.prefix + key) || localStorage.getItem(this.prefix + key);
    },

    /**
     * Deletes a value from the store
     *
     * @param key
     */
    unsetValue: function(key) {
        window.localStorage.removeItem(this.prefix + key);
        window.sessionStorage.removeItem(this.prefix + key);
    }
};
