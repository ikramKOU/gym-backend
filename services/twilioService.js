const twilio = require('twilio');
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function sendSms(to, body) {
  return client.messages.create({
    body,
    from: process.env.TWILIO_PHONE,
    to: to.startsWith('+') ? to : `+91${to}`,
  });
}

module.exports = { sendSms };