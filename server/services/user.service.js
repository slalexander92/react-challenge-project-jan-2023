const User = require('../models/user.model');
const passwordService = require('./password.service');

const userService = {
  create,
  read,
  update,
  destroy,
};

function create(email, password) {
  const passwordHash = passwordService.createHash(password);

  const userRecord = new User({
    email,
    password: passwordHash,
  });

  return userRecord.save()
    .then(response => {
      if (response && response._id) return response;

      return Promise.reject('User Failed to Save');
    });
}

function read() {
  // todo
}

function update() {
  // todo
}

function destroy() {
  // todo
}

module.exports = userService;
