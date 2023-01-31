const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid Access Token' });
    next(err);
  }
};

module.exports = {
  validateToken,
};
