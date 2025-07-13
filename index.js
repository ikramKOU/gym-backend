require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const usersRoute = require('./routes/users');
const smsRoute = require('./routes/sms');

app.use(cors());
app.use(express.json());

app.use('/users', usersRoute);
app.use('/send-sms', smsRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));