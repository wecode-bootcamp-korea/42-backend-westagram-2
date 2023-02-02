const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userDao = require('../models/userDao');

const signUp = async (username, email, profileImage, password) => {
  const user = await userDao.getUserByEmail(email);
  console.log(user);
  if (user) {
    throw new Error('EMAIL_IS_ALREADY_IN_USE');
  }

  const PASSWORD_REGEX =
    '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})';
  const pwValidation = new RegExp(PASSWORD_REGEX);

  if (!pwValidation.test(password)) {
    const err = new Error('PASSWORD_IS_NOT_VALID');
    err.statusCode = 400;
    throw err;
  }

  const COST_FACTOR = 12;
  const hashedPassword = await bcrypt.hash(password, COST_FACTOR);

  return userDao.createUser(username, email, profileImage, hashedPassword);
};

const signIn = async (email, password) => {
  const user = await userDao.getUserByEmail(email);

  if (!user) {
    const err = new Error('USER_EMAIL_DOES_NOT_EXIST');
    err.statusCode = 401;
    throw err;
  }
  const hashedPassword = user.password;
  const isMatchPassword = await bcrypt.compare(password, hashedPassword);

  if (!isMatchPassword) {
    const err = new Error('PASSWORD_IS_NOT_MATCHED');
    err.statusCode = 401;
    throw err;
  }

  const userId = user.id;
  return jwt.sign({ userId }, process.env.SECRET_KEY);
};

module.exports = {
  signUp,
  signIn,
};
