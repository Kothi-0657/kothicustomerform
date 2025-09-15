// app.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

app.post('/submit', (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    appointmentDate,
    appointmentTime,
  } = req.body;

  let requirements = req.body.requirements || [];
  if (!Array.isArray(requirements)) {
    requirements = [requirements];
  }

  console.log('Form Submission:', {
    firstName,
    lastName,
    email,
    phone,
    requirements,
    appointmentDate,
    appointmentTime,
  });

  res.send(`
    <h2>Thank you, ${firstName}!</h2>
    <p>We've received your request for: <strong>${requirements.join(', ')}</strong>.</p>
    <p>Scheduled for: <strong>${appointmentDate}</strong> at <strong>${appointmentTime}</strong>.</p>
    <a href="/">Back to Form</a>
  `);
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
