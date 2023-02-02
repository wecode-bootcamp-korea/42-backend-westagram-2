const userService = require("../services/userService");

const signUp = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, profileImage } = req.body;

    if (!name || !email || !password || !phoneNumber) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    await userService.signUp(name, email, password, phoneNumber, profileImage);
    return res.status(201).json({ message: "userCreated" });
  } catch (err) {
    console.error(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    await userService.logIn(email, password);
    const result = await userService.logIn(email, password);
    return res.status(201).json({ accessToken: result });
  } catch (err) {
    console.error(err);
    return res.status(err.status || 500).json({ message: err.message });
  }
};

module.exports = {
  signUp,
  logIn,
};
