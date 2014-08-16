var BillyApiClient = require('../../src/client'),
    extendObject = require('../../src/helpers/extend-object');

QUnit.module('helpers/extend-object');

test('basic empty object extension', function() {
    deepEqual({}, extendObject({}, {}, {}));
});

test('extend onto empty object', function() {
    deepEqual({
        foo: 'bar',
        one: 'two'
    }, extendObject({}, {
        foo: 'bar',
        one: 'two'
    }));
});

test('overwrites properties', function() {
    deepEqual({
        foo: 'bar',
        one: 'three'
    }, extendObject({
        foo: 'bar',
        one: 'two'
    }, {
        foo: 'bar',
        one: 'three'
    }));
});

test('modifies original', function() {
    var original = {
        foo: 'bar',
        one: 'two'
    };

    extendObject(original, {another: 'property'});
    
    deepEqual(original, extendObject({
        foo: 'bar',
        one: 'two',
        another: 'property'
    }));
});
