var jQuery;

try {
    jQuery = require('jquery');
} catch (e) {
    //Ignore
}

module.exports =  {
    ajax: jQuery ? jQuery.ajax : null,
    apiUrl: '',
    headers: {
        'X-No-Authorization-Header': true
    },
    language: null,
    unauthenticatedUrls: [
        '/countries',
        '/countryGroups',
        '/currencies',
        '/ipLocation',
        '/locales',
        /\/organizationInvitations\/(.+)\/newUserAccept^/i,
        '/user/login',
        '/user/passwordReset',
        '/user/passwordResetRequest',
        '/user/signup'
    ]
};
