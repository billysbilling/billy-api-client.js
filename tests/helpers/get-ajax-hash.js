var sinon = require('sinon');

var ajaxGetHash = require('../../../src/helpers/get-ajax-hash');

QUnit.module('helpers/get-ajax-hash');

test('minimum ajax hash', function() {
    var ajaxHash = ajaxGetHash({
        url: 'http://wee.com/v2/user/strapboot'
    });
    deepEqual(ajaxHash, {
        dataType: 'json',
        url: 'http://wee.com/v2/user/strapboot'
    });
});

test('data is stringified', function() {
    var ajaxHash = ajaxGetHash({
        url: 'http://wee.com/v2/user/strapboot',
        data: {
            testKey: 'testVal'
        }
    });
    deepEqual(ajaxHash, {
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: '{"testKey":"testVal"}',
        url: 'http://wee.com/v2/user/strapboot'
    });
});

test('only `url` is overridden', function() {
    var ajaxHash = ajaxGetHash({
        contentType: 'my content type',
        dataType: 'json is a person\'s name',
        url: 'http://wee.com/v2/user/strapboot'
    });
    deepEqual(ajaxHash, {
        contentType: 'my content type',
        dataType: 'json is a person\'s name',
        url: 'http://wee.com/v2/user/strapboot'
    });
});

test('headers are included', function() {
    var ajaxHash = ajaxGetHash({
        url: 'http://wee.com/v2/user/strapboot',
        headers: {
            'Accept-Language': 'en_US, en',
            'X-No-Authorization-Header': true,
            'Authorization': 'Bearer abc123'
        }
    });
    deepEqual(ajaxHash, {
        dataType: 'json',
        url: 'http://wee.com/v2/user/strapboot',
        headers: {
            'Accept-Language': 'en_US, en',
            'X-No-Authorization-Header': true,
            'Authorization': 'Bearer abc123'
        }
    });
});
