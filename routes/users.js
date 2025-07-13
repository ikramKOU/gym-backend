const express = require('express');
const router = express.Router();
const { fetchUsersFromSheet } = require('../services/googleSheet');

router.get('/', async (req, res) => {
  try {
    const users = await fetchUsersFromSheet();
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;