module.exports =  {
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
        /\/organizationInvitations\/([^\/]+)\/([^\/]+)$/i, //Getting a single invitation
        /\/organizationInvitations\/([^\/]+)\/([^\/]+)\/newUserAccept$/i, //Posting a new user via invitation
        '/user/login',
        '/user/passwordReset',
        '/user/passwordResetRequest',
        '/user/signup'
    ]
};
