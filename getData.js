#!/usr/bin/env node
const fs = require('fs');
const gsjson = require('google-spreadsheet-to-json');

let credentials;

try {
    credentials = require('./service-account.json');
} catch (e) {
    console.warn('no spreadsheet access file found, trying env variables:');
    credentials = JSON.parse(process.env.SERVICE_ACCOUNT)
}

const fetchData = (spreadsheetId) =>
    gsjson({
        spreadsheetId,
        credentials
    })

module.exports = fetchData;

if (require.main === module) {
    fetchData(process.argv[2])
        .then(function (result) {
            console.log('found ' + result.length + ' locales');
            fs.writeFileSync('./locales.json', JSON.stringify(result.map(({locale}) => locale), null, 2), 'utf8');
        })
        .catch(function (err) {
            console.error(err.message);
            console.error(err.stack);
        });
}
