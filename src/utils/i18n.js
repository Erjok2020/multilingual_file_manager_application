const i18next = require('i18next');
const Backend = require('i18next-fs-backend');

i18next
    .use(Backend)
    .init({
        backend: {
            loadPath: './locales/{{lng}}/{{ns}}.json',
        },
        lng: 'en', // default language
        fallbackLng: 'en',
        preload: ['en', 'fr'], // preload the languages
    });

module.exports = i18next;
