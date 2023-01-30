const userDao = require("../models/userDao");

const signUp = async (name, password, email, phoneNumber, profileImage) => {
  return await userDao.signUp(name, password, email, phoneNumber, profileImage);
};

module.exports = {
  signUp,
};
