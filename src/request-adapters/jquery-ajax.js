try {
    var jQuery = require('jquery');
} catch (e) {
    //Ignore
}

var JQueryAjaxAdapter = module.exports = function() {

    //Set send method
    this.send = jQuery ? jQuery.ajax : null;

    //Check set
    if (!this.send) {
        throw new Error('jQuery is required to use the JQueryAjaxAdapter.');
    }
};

JQueryAjaxAdapter.prototype = {
    send: null
};
