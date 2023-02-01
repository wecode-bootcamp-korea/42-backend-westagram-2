const jwt = require('jsonwebtoken');
const userDao = require('../models/userDao');

const validateToken = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      const error = new Error('NEED_ACCESS_TOKEN');
      error.statusCode = 401;
      throw error;
    }

    const decoded = jwt.verify(accessToken, process.env.SECRET_KEY);
    const user = await userDao.isUserIdExist(decoded.userId);

    if (!user) {
      const error = new Error('USER_DOES_NOT_EXIST');
      error.statusCode = 404;
      throw error;
    }

    req.user = decoded.userId;
    next();
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 401).json({ message: err.message });
  }
};

module.exports = {
  validateToken,
};
