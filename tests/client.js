var amock = require('amock'),
    sinon = require('sinon');

var BillyApiClient = require('../../src/client');

var client,
    sendRequestStub;

QUnit.module('BillyApiClient', {
    setup: function() {
        amock.install();
        client = new BillyApiClient({
            apiUrl: 'http://testapi.example.com/v2',
            language: 'some_WHERE, en'
        });
    },

    teardown: function() {
        amock.reset();
        if (sendRequestStub && typeof sendRequestStub.restore === "function") {
            sendRequestStub.restore();
        }
        client.storageAdapter.unsetValue('accessToken');
        client = undefined;
    }
});

test('GET unauthenticated', function() {
    expect(1);
    sendRequestStub = sinon.stub(client, 'sendRequest', function(hash) {
        deepEqual(hash, {
            type: 'GET',
            url: 'http://testapi.example.com/v2/countries',
            headers: {
                'Accept-Language': 'some_WHERE, en',
                'X-No-Authorization-Header': true,
                testHeader: 'testHeaderVal'
            },
            isAuthenticated: false
        });
    });
    client.get('/countries', {
        headers: {
            testHeader: 'testHeaderVal'
        }
    });
});

test('GET authenticated', function() {
    expect(2);
    sendRequestStub = sinon.stub(client, 'sendRequest', function(hash) {
        deepEqual(hash, {
            type: 'GET',
            url: 'http://testapi.example.com/v2/invoices',
            headers: {
                'Accept-Language': 'some_WHERE, en',
                'X-No-Authorization-Header': true,
                testHeader: 'testHeaderVal'
            },
            isAuthenticated: true
        });
        return {
            then: function() {
                ok(true, 'then() was called on promise');
            }
        }
    });

    //Make request
    client
        .get('/invoices', {
            headers: {
                testHeader: 'testHeaderVal'
            }
        })
        .then();
});

test('POST', function() {
    expect(1);
    sendRequestStub = sinon.stub(client, 'sendRequest', function(hash) {
        deepEqual(hash, {
            type: 'POST',
            url: 'http://testapi.example.com/v2/countries',
            data: {
                someKey: 'someVal'
            },
            headers: {
                'Accept-Language': 'some_WHERE, en',
                'X-No-Authorization-Header': true,
                testHeader: 'testHeaderVal'
            },
            isAuthenticated: false
        });
    });
    client.post('/countries', {
        "someKey": "someVal"
    }, {
        headers: {
            testHeader: 'testHeaderVal'
        }
    });
});

test('PUT', function() {
    expect(1);
    sendRequestStub = sinon.stub(client, 'sendRequest', function(hash) {
        deepEqual(hash, {
            type: 'PUT',
            url: 'http://testapi.example.com/v2/countries',
            data: {
                someKey: 'someVal'
            },
            headers: {
                'Accept-Language': 'some_WHERE, en',
                'X-No-Authorization-Header': true,
                testHeader: 'testHeaderVal'
            },
            isAuthenticated: false
        });
    });
    client.put('/countries', {
        "someKey": "someVal"
    }, {
        headers: {
            testHeader: 'testHeaderVal'
        }
    });
});

test('PATCH', function() {
    expect(1);
    sendRequestStub = sinon.stub(client, 'sendRequest', function(hash) {
        deepEqual(hash, {
            type: 'PATCH',
            url: 'http://testapi.example.com/v2/countries',
            data: {
                someKey: 'someVal'
            },
            headers: {
                'Accept-Language': 'some_WHERE, en',
                'X-No-Authorization-Header': true,
                testHeader: 'testHeaderVal'
            },
            isAuthenticated: false
        });
    });
    client.patch('/countries', {
        "someKey": "someVal"
    }, {
        headers: {
            testHeader: 'testHeaderVal'
        }
    });
});

test('DELETE', function() {
    expect(1);
    sendRequestStub = sinon.stub(client, 'sendRequest', function(hash) {
        deepEqual(hash, {
            type: 'DELETE',
            url: 'http://testapi.example.com/v2/countries',
            headers: {
                'Accept-Language': 'some_WHERE, en',
                'X-No-Authorization-Header': true,
                testHeader: 'testHeaderVal'
            },
            isAuthenticated: false
        });
    });
    client.delete('/countries', {
        headers: {
            testHeader: 'testHeaderVal'
        }
    });
});

asyncTest('login should fire authorize event', function() {
    expect(6);

    var resPayload = {
        meta: {
            accessToken: 'abc123'
        }
    };

    var loginMock = amock('POST', 'http://testapi.example.com/v2/user/login')
        .reply(200, resPayload)
        .json(function(reqPayload) {
            deepEqual(reqPayload, {
                credentials: {
                    email: 'john@billysbilling.com',
                    password: 'hejhej'
                }
            })
        });


    var authorizeEvent = function(accessToken) {
        ok(true, 'authorize was fired');
        equal(accessToken, 'abc123', 'accessToken matches returned value');
        loginMock.done();
        client.off('authorize', authorizeEvent);
        start();
    };

    //Bind to event
    client.on('authorize', authorizeEvent);
    client.login('john@billysbilling.com', 'hejhej', false, function(err, payload) {
        ok(!err, 'No error was passed to callback');
        deepEqual(resPayload, payload, 'success callback called with payload matches');
    });
});

asyncTest('login should fire becameAuthorized event', function() {
    expect(5);

    var resPayload = {
        meta: {
            accessToken: 'abc123'
        }
    };

    var loginMock = amock('POST', 'http://testapi.example.com/v2/user/login')
        .reply(200, resPayload)
        .json(function(reqPayload) {
            deepEqual(reqPayload, {
                credentials: {
                    email: 'john@billysbilling.com',
                    password: 'hejhej'
                }
            })
        });


    var becameAuthorizedEvent = function() {
        ok(true, 'becameAuthorizedEvent was fired');
        loginMock.done();
        client.off('becameAuthorized', becameAuthorizedEvent);
        start();
    };

    //Bind to event
    client.on('authorize', becameAuthorizedEvent);
    client.login('john@billysbilling.com', 'hejhej', false, function(err, payload) {
        ok(!err, 'No error was passed to callback');
        deepEqual(resPayload, payload, 'success callback called with payload matches');
    });
});
