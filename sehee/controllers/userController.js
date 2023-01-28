const userService = require("../services/userService");

const signUp = async (req, res) => {
  try {
    const { name, password, email, phoneNumber, profileImage } = req.body;

    if (!name || !password || !email || !phoneNumber || !profileImage) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await userService.signUp(name, password, email, phoneNumber, profileImage);

    return res.status(201).json({ message: "SIGNUP_SUCCESS" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  signUp,
};
