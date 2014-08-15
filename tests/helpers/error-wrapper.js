var BillyApiClient = require('../../src/client'),
    errorWrapper = require('../../src/helpers/error-wrapper');

var client;

QUnit.module('helpers/error-wrapper', {
    setup: function() {
        client = new BillyApiClient();
    },

    teardown: function() {
        client = undefined;
    }
});

test('callback can be null', function() {
    expect(4);
    client.on('error', function(one, two, three) {
        ok(true, 'error was triggered');
        strictEqual(one, 'arg1', 'arg1 is correct');
        strictEqual(two, 'arg2', 'arg2 is correct');
        strictEqual(three, 'arg3', 'arg3 is correct');
    });

    var wrappedError = errorWrapper(client, null);

    //Call error
    wrappedError('arg1', 'arg2', 'arg3');
});


test('error is triggered on client, original error is called', function() {
    expect(8);
    client.on('error', function(one, two, three) {
        ok(true, 'error was triggered');
        strictEqual(one, 'arg1', 'arg1 is correct');
        strictEqual(two, 'arg2', 'arg2 is correct');
        strictEqual(three, 'arg3', 'arg3 is correct');
    });

    var wrappedError = errorWrapper(client, function(one, two, three) {
        ok(true, 'original error handler was called');
        strictEqual(one, 'arg1', 'arg1 is correct');
        strictEqual(two, 'arg2', 'arg2 is correct');
        strictEqual(three, 'arg3', 'arg3 is correct');
    });

    //Call error
    wrappedError('arg1', 'arg2', 'arg3');
});
