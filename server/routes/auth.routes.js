const express = require('express');
const userService = require('../services/user.service');
const passwordService = require('../services/password.service');
const User = require('../models/user.model');

const router = express.Router();

// login expects email/password
// successful login returns email and a fake token (if we ever want to use it)
router.post('/login', (req, res) => {
  const genericErrorMessage = 'Bad register information, try again';

  try {
    if (!req.body || !req.body.email || !req.body.password) {
      res.status(401).json({ success: false, error: genericErrorMessage });
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
        res.status(401).json({ success: false, error: genericErrorMessage });
      });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Unknown error, try again' });
  }
})

router.post('/register', (req, res) => {
  const { email, password } = req.body;
  const genericErrorMessage = 'Bad register information';

  try {
    if (!req.body || !req.body.email || !req.body.password) {
      res.status(401).json({ success: false, error: genericErrorMessage });
      return;
    }

    return User.findOne({ email })
      .then(user => {
        // don't allow multiple users with same email
        if (user && user._id) return Promise.reject();

        return userService.create(email, password)
          .then(data => res.status(200).json({ success: true, data }));
      })
      .catch(() => {
        res.status(401).json({ success: false, error: genericErrorMessage });
      })
  } catch(error) {
    res.status(500).json({ success: false, error });
  }
});

module.exports = router;
