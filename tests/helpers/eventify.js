var BillyApiClient = require('../../src/client'),
    EventEmitter = require('eventEmitter');

var client;

QUnit.module('helpers/eventify', {
    setup: function() {
        client = new BillyApiClient();
    },

    teardown: function() {
        client.off('becameAuthorized');
        client.off('becameUnauthorized');
        client = undefined;
    }
});

test('client.eventEmitter is instance of EventEmitter', function() {
    ok(client.eventEmitter instanceof EventEmitter);
});

test('client has all pertinent EventEmitter events', function() {
    ok(client.on, 'on');
    ok(client.off, 'off');
    ok(client.once, 'once');
    ok(client.trigger, 'trigger');
    ok(client.emit, 'emit');
});

asyncTest('authorize should fire authorize and becameAuthorized event', function() {
    expect(2);
    var authorizeCheck = function() {
        ok(true, 'authorize was triggered');
    };

    //Bind to event
    client.on('authorize', authorizeCheck);
    client.on('becameAuthorized', function() {
        ok(true, 'becameAuthorized was triggered');
        client.off('authorize', authorizeCheck);
        start();
    });
    client.authorize('abc');
});

asyncTest('calling authorize N times should fire authorize N and becameAuthorized once', function() {
    expect(7);

    var count = 1;
    var authorizeCheck = function() {
        ok(true, 'authorize was triggered');
        if (count === 5) {
            client.off('authorize');
            client.off('becameAuthorized');
            start();
        }
        count++;
    };

    //Bind to event
    client.on('becameAuthorized', function(accessToken) {
        ok(true, 'becameAuthorized was triggered');
        strictEqual(accessToken, 'abc', 'becameAuthorized event has correct accessToken as parameter');
    });
    client.on('authorize', authorizeCheck);
    client.authorize('abc');
    client.authorize('abc');
    client.authorize('abc');
    client.authorize('abc');
    client.authorize('abc');
});

asyncTest('error with 401 should fire unauthorize', function() {
    expect(2);
    var errorCallback = function() {
            ok(true, 'error was triggered');
        },
        unauthorizeCallback = function() {
            ok(true, 'unauthorize was triggered');
            start();
        };
    //Bind to event
    client.on('error', errorCallback);
    client.on('unauthorize', unauthorizeCallback);
    client.trigger('error', [{status: 401}]);
    client.off('error', errorCallback);
    client.off('unauthorize', unauthorizeCallback);
});

asyncTest('error with 422 should fire validationError', function() {
    expect(2);
    var errorCallback = function() {
            ok(true, 'error was triggered');
        },
        validationErrorCallback = function() {
            ok(true, 'validationError was triggered');
            start();
        };
    //Bind to event
    client.on('error', errorCallback);
    client.on('validationError', validationErrorCallback);
    client.trigger('error', [{status: 422}]);
    client.off('error', errorCallback);
    client.off('validationError', validationErrorCallback);
});

asyncTest('error with 500 should fire serverError', function() {
    expect(2);
    var errorCallback = function() {
            ok(true, 'error was triggered');
        },
        serverErrorCallback = function() {
            ok(true, 'serverError was triggered');
            start();
        };
    //Bind to event
    client.on('error', errorCallback);
    client.on('serverError', serverErrorCallback);
    client.trigger('error', [{status: 500}]);
    client.off('error', errorCallback);
    client.off('serverError', serverErrorCallback);
});
