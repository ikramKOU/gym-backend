const express = require('express');
const router = express.Router();
const { sendSms } = require('../services/twilioService');

router.post('/', async (req, res) => {
  const { name, number, messageType } = req.body;
  const message =
    messageType === 'reminder'
      ? `Hi ${name}, this is a reminder from your gym.`
      : `Welcome to the gym, ${name}!`;

  try {
    const result = await sendSms(number, message);
    res.json({ success: true, sid: result.sid });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send SMS' });
  }
});

module.exports = router;