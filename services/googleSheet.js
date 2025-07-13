const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');
const keys = require('../google-credentials.json');

const auth = new GoogleAuth({
  credentials: keys,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const SHEET_ID = '1DbjJaNSwbeRdo-lCkOmxV5FMjt8nEhAdDFEoVzsLwm0';
const RANGE = 'Form Responses 1';

async function fetchUsersFromSheet() {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: RANGE,
  });

  const [header, ...rows] = res.data.values;
  return rows.map(row => {
    const user = {};
    header.forEach((key, idx) => {
      user[key.toLowerCase().replace(/ /g, '_')] = row[idx];
    });
    return user;
  });
}

module.exports = { fetchUsersFromSheet };