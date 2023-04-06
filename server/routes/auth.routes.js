const express = require('express');
const userService = require('../services/user.service');
const passwordService = require('../services/password.service');
const User = require('../models/user.model');

const router = express.Router();

// login expects email/password
// successful login returns email and a fake token (if we ever want to use it)
router.post('/login', (req, res) => {
  try {
    if (!req.body || !req.body.email || !req.body.password) {
      res.status(401).json({ success: false, error: 'Bad login information, try again' });
      return;
    }

    const { email, password } = req.body;

    return User.findOne({ email })
      .then(user => {
        const storedPasswordHash = user && user.password;
        const isPasswordMatch = passwordService.compareToHash(password, storedPasswordHash);

        if (!user || !isPasswordMatch) return Promise.reject();

        res.status(200).json({
          success: true,
          email: req.body.email,
          token: '12345luggage'
        });
      })
      .catch(() => {
        res.status(401).json({ success: false, error: 'Bad login information, try again' });
      });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Unknown error, try again' });
  }
})

router.post('/sign-up', (req, res) => {
  const { email, password } = req.body;

  try {
    if (!req.body || !req.body.email || !req.body.password) {
      res.status(401).json({ success: false, error: 'Bad register information' });
      return;
    }

    return userService.create(email, password)
      .then(data => res.status(200).json({ success: true, data }));

  } catch(error) {
    res.status(500).json({ success: false, error });
  }
});

module.exports = router;
