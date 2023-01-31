const userDao = require('../models/userDao');

const signUp = async (username, email, profileImage, password) => {
  const PASSWORD_REGEX =
    '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})';
  const pwValidation = new RegExp(PASSWORD_REGEX);

  if (!pwValidation.test(password)) {
    const err = new Error('PASSWORD_IS_NOT_VALID');
    err.statusCode = 400;
    throw err;
  }
  return await userDao.createUser(username, email, profileImage, password);
};

module.exports = {
  signUp,
};
