/** @type {import('next').NextConfig} */
const locales = require("./locales.json");

module.exports = {
    reactStrictMode: true,
    i18n: {
        locales,
        defaultLocale: 'en-us',
    }
}
