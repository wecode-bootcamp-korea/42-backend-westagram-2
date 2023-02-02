const userService = require('../services/userService');
const { checkError } = require('../middleware/errorHandler');

const signUp = checkError(async (req, res) => {
  const { username, email, profileImage, password } = req.body;

  if (!username || !email || !password) {
    const err = new Error('KEY_ERROR');
    err.statusCode = 400;
    throw err;
  }

  await userService.signUp(username, email, profileImage, password);

  res.status(201).json({ message: 'SIGNUP_SUCCESS' });
});

const signIn = checkError(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const err = new Error('KEY_ERROR');
    err.statusCode = 400;
    throw err;
  }

  const accessToken = await userService.signIn(email, password);
  return res.status(200).json({ accessToken });
});

module.exports = {
  signUp,
  signIn,
};
