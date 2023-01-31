const userService = require('../services/userService');

const signUp = async (req, res) => {
  try {
    const { username, email, profileImage, password } = req.body;

    if (!username || !email || !profileImage || !password) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    await userService.signUp(username, email, profileImage, password);

    res.status(201).json({ message: 'SIGNUP_SUCCESS' });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    const userToken = await userService.signIn(email, password);
    return res.status(200).json({ accessToken: userToken });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  signUp,
  signIn,
};
