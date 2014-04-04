var isAuthenticatedUrl = require('../../../src/helpers/is-authenticated-url');

QUnit.module('helpers/is-authenticated-url');

test('whitelist', function() {
    var prefix = 'http://testapi.example.com/v2';
    var unauthenticatedUrls = [
        '/countries',
        '/locales',
        '/user/passwordResetRequest'
    ];

    //Unauthenticated
    ok(!isAuthenticatedUrl('/countries', unauthenticatedUrls, prefix), '/countries is unauthenticated');
    ok(!isAuthenticatedUrl('/locales', unauthenticatedUrls, prefix), '/locales is unauthenticated');
    ok(!isAuthenticatedUrl('/user/passwordResetRequest', unauthenticatedUrls, prefix), '/user/passwordResetRequest is unauthenticated');
    ok(!isAuthenticatedUrl('/countries?groupId=EU', unauthenticatedUrls, prefix), '/countries?groupId=EU is unauthenticated');

    //Authenticated
    ok(isAuthenticatedUrl('http://testapi.example.com/v2/invoices', unauthenticatedUrls, prefix), '/invoices is authenticated');
    ok(isAuthenticatedUrl('http://testapi.example.com/v2/bills', unauthenticatedUrls, prefix), '/bills is authenticated');
    ok(isAuthenticatedUrl('http://testapi.example.com/v2/invoices?organizationId=org1', unauthenticatedUrls, prefix), '/invoices with QP is authenticated');
});

test('whitelist (absolute)', function() {
    var prefix = 'http://testapi.example.com/v2';
    var unauthenticatedUrls = [
        '/countries',
        '/locales',
        '/user/passwordResetRequest'
    ];

    //Unauthenticated
    ok(!isAuthenticatedUrl('http://testapi.example.com/v2/countries', unauthenticatedUrls, prefix), '/countries is unauthenticated');
    ok(!isAuthenticatedUrl('http://testapi.example.com/v2/locales', unauthenticatedUrls, prefix), '/locales is unauthenticated');
    ok(!isAuthenticatedUrl('http://testapi.example.com/v2/user/passwordResetRequest', unauthenticatedUrls, prefix), '/user/passwordResetRequest is unauthenticated');
    ok(!isAuthenticatedUrl('http://testapi.example.com/v2/countries?groupId=EU', unauthenticatedUrls, prefix), '/countries?groupId=EU is unauthenticated');

    //Authenticated
    ok(isAuthenticatedUrl('http://testapi.example.com/v2/invoices', unauthenticatedUrls, prefix), '/invoices is authenticated');
    ok(isAuthenticatedUrl('http://testapi.example.com/v2/bills', unauthenticatedUrls, prefix), '/bills is authenticated');
    ok(isAuthenticatedUrl('http://testapi.example.com/v2/invoices?organizationId=org1', unauthenticatedUrls, prefix), '/invoices with QP is authenticated');
});
