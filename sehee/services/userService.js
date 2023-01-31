const userDao = require("../models/userDao");
const pwValidation = new RegExp(
  "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
);
const signUp = async (name, email, password, phoneNumber, profileImage) => {
  try {
    const test = pwValidation.test(password);

    if (!test) {
      throw new Error("PASSWORD_DO_NOT_MEET_CONDITIONS");
    }

    return await userDao.signUp(
      name,
      email,
      password,
      phoneNumber,
      profileImage
    );
  } catch (err) {
    const test = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }
};

module.exports = {
  signUp,
};
