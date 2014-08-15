var EventEmitter = require('eventEmitter');

module.exports = function(client) {
    var ee = new EventEmitter(),
        methods = ['on', 'once', 'off', 'trigger', 'emit'];

    //Create bound events on client
    for (var i = 0; i < methods.length; i++) {
        var name = methods[i];
        client[name] = ee[name].bind(ee);
    }

    //Add EE to client
    client.eventEmitter = ee;

    //Basic events
    client.on('authorize', function() {
        if (client.isAuthorized === false) {
            client.isAuthorized = true;
            client.trigger('becameAuthorized', arguments);
        }
    });
    client.on('unauthorize', function() {
        if (client.isAuthorized === true) {
            client.isAuthorized = false;
            client.trigger('becameUnauthorized', arguments);
        }
    });
    client.on('error', function(xhr) {
        //Request failed
        switch (xhr.status) {
            case 401:
                //Authorization error
                client.trigger('unauthorize', arguments);
                break;
            case 422:
                //Validation error
                client.trigger('validationError', arguments);
                break;
            case 500:
                //Internal server error
                client.trigger('serverError', arguments);
                break;
        }
    });
};
