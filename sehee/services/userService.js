const userDao = require("../models/userDao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const pwValidation = new RegExp(
  "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
);
const signUp = async (name, email, password, phoneNumber, profileImage) => {
  try {
    const test = pwValidation.test(password);

    if (!test) {
      throw new Error("FAILED_TO_VALIDATE_PASSWORD");
    }

    const saltRounds = 12;
    const makeHash = async (password, saltRounds) => {
      return await bcrypt.hash(password, saltRounds);
    };

    const hashedPassword = await makeHash(password, saltRounds);

    return await userDao.signUp(
      name,
      email,
      hashedPassword,
      phoneNumber,
      profileImage
    );
  } catch (err) {
    const test = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }
};

const logIn = async (email, password) => {
  try {
    const user = await userDao.getUserInformation(email);
    if (!user) {
      throw new Error("INVALID_USER");
    }
    const userPassword = user.password;
    const matchPassword = await bcrypt.compare(password, userPassword);
    if (!matchPassword) {
      throw new Error("PASSWORD_IS_WRONG");
    }
    const userId = user.id;
    const payLoad = { userId: userId };

    const jwtToken = jwt.sign(payLoad, process.env.SECRETKEY);
    return jwtToken;
  } catch (err) {
    const error = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }
};

module.exports = {
  signUp,
  logIn,
};
