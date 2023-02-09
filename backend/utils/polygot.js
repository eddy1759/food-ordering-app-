const {Polyglot} = require('node-polyglot');
import {messages} = require('../config/i18n')

const startPolyglot = (req, res, next) => {
    // ! Get the locale from express-locale
    const locale = req.locale.language;

    // ! Start Polyglot and add it to the req
    req.polyglot = new Polyglot();

    // Use the phrase of polyglot
    if (locale === 'en') {
        return req.polyglot.extend(messages.ar)
    }

    next();
}