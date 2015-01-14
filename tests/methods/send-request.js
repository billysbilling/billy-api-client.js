var amock = require('amock');

var BillyApiClient = require('../../../src/client');

var client;

QUnit.module('methods/send-request', {
    setup: function() {
        amock.install();
        client = new BillyApiClient();
    },

    teardown: function() {
        amock.reset();
        client.storageAdapter.unsetValue('accessToken');
        client = undefined;
    }
});

asyncTest('authorized GET', function() {
    expect(1);
    client.storageAdapter.setValue('accessToken', 'abc');
    var bootstrizzleRequest = amock('GET', '/user/bootstrap').reply(200);
    client.get('/user/bootstrap', {
        success: function() {
            bootstrizzleRequest.done();
            start();
        }
    });
});

asyncTest('authorized POST', function() {
    expect(1);
    client.storageAdapter.setValue('accessToken', 'abc');
    var settingRequest = amock('POST', '/organization/blah/settings/blahblah').reply(200);
    client.post('/organization/blah/settings/blahblah', {}, {
        success: function() {
            settingRequest.done();
            start();
        }
    });
});

asyncTest('authorized PUT', function() {
    expect(1);
    client.storageAdapter.setValue('accessToken', 'abc');
    var settingRequest = amock('PUT', '/organization/blah/settings/blahblah').reply(200);
    client.put('/organization/blah/settings/blahblah', {}, {
        success: function() {
            settingRequest.done();
            start();
        }
    });
});

asyncTest('authorized PATCH', function() {
    expect(1);
    client.storageAdapter.setValue('accessToken', 'abc');
    var settingRequest = amock('PATCH', '/organization/blah/settings/blahblah').reply(200);
    client.patch('/organization/blah/settings/blahblah', {}, {
        success: function() {
            settingRequest.done();
            start();
        }
    });
});

asyncTest('authorized DELETE', function() {
    expect(1);
    client.storageAdapter.setValue('accessToken', 'abc');
    var settingRequest = amock('DELETE', '/organization/blah/settings/blahblah').reply(200);
    client.delete('/organization/blah/settings/blahblah', {
        success: function() {
            settingRequest.done();
            start();
        }
    });
});

asyncTest('sends Accept-Language', function() {
    expect(2);

    client.options.language = 'en_US'
    client.storageAdapter.setValue('accessToken', 'abc');

    var settingRequest = amock('GET', '/lala')
        .reply(200)
        .before(function(xhr) {
            equal(xhr.requestHeaders['Accept-Language'], 'en_US')
        })

    client.get('/lala', {
        success: function() {
            settingRequest.done();
            start();
        }
    });
});

asyncTest('can override language', function() {
    expect(2);

    client.options.language = 'en_US'
    client.storageAdapter.setValue('accessToken', 'abc');

    var settingRequest = amock('GET', '/lala')
        .reply(200)
        .before(function(xhr) {
            equal(xhr.requestHeaders['Accept-Language'], 'da_DK')
        })

    client.get('/lala', {
        headers: {
            'Accept-Language': 'da_DK'
        },
        success: function() {
            settingRequest.done();
            start();
        }
    });
});
