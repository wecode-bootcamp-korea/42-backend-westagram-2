const userService = require("../services/userService");

const signUp = async (req, res) => {
  const { name, password, email, phoneNumber, profileImage } = req.body;
  await userService.signUp(name, password, email, phoneNumber, profileImage);
  return res.status(201).json({ message: "userCreated" });
};

module.exports = {
  signUp,
};
