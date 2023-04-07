const crypto = require('crypto');

const passwordService = {
  createHash,
  getInvalidPasswordError,
	compareToHash,
	isPasswordMatch,
};

const SALT = 'THE_MITOCHONDRIA_IS_THE_POWERHOUSE_OF_THE_CELL';

function getInvalidPasswordError(password) {
	if (!password || password.length < 8) {
		return 'Password must be at least 8 characters.';
	}
}

function compareToHash(plainPassword, hashedPassword) {
	return isPasswordMatch(plainPassword, hashedPassword)
}

function isPasswordMatch(plainPassword, hashedPassword) {
  const inputPasswordHash = createHash(plainPassword);

  return inputPasswordHash === hashedPassword;
}

function createHash(password) {
  return crypto.pbkdf2Sync(String(password), SALT, 10, 64, 'sha256').toString('hex');
}

module.exports = passwordService;
