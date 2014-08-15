var MemoryStorageAdapter = module.exports = function() {
    this.store = {};
};

MemoryStorageAdapter.prototype = {

    /**
     * Instance-based storage
     */
    store: null,

    /**
     * Saves a value to the store.  Persist is not supported for the memory store, so don't use it.
     *
     * @param key
     * @param value
     * @param persist
     */
    setValue: function(key, value, persist) {
        this.store[key] = value;
    },

    /**
     * Saves a value to the store.  Persist is not supported for the memory store, so don't use it.
     *
     * @param key
     */
    getValue: function(key) {
        return this.store[key];
    },

    /**
     * Deletes a value from the store
     *
     * @param key
     */
    unsetValue: function(key) {
        delete this.store[key];
    }
};
